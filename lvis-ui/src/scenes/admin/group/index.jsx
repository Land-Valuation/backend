import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {FaPlus, FaTrash, FaChevronRight, FaChevronDown} from 'react-icons/fa';
import {getListGroup} from '@/service/group.js';
import CreateGroup from '@/scenes/admin/group/modal/index.jsx';

function convertGroups(groups, parentId = null, level = 0) {
  return groups.map(group => {
    const children = group.subGroups && group.subGroups.length > 0 ?
        convertGroups(group.subGroups, group.id, level + 1) :
        [];

    return {
      id: group.id,
      name: group.name,
      createdAt: new Date().toISOString().split('T')[0],
      childCount: children.length,
      hasChildren: children.length > 0,
      parentId: parentId,
      level: level,  // Thêm level
      children: children,
    };
  });
}

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    getListGroup(true).then((response) => {
      const {data} = response.data;
      setGroups(convertGroups(data));
    });
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(prevGroups => {
      const newGroups = prevGroups.map(group => {
        if (group.children) {
          return {
            ...group,
            children: group.children.filter(child => child.id !== groupId),
          };
        }
        return group;
      });
      return newGroups.filter(group => group.id !== groupId);
    });
  };

  const handleAddChild = (parentId) => {
    setGroups(prevGroups => prevGroups.map(group => {
      if (group.id === parentId) {
        const newChild = {
          id: Date.now(),
          name: `Child of ${group.name}`,
          createdAt: new Date().toISOString().split('T')[0],
          childCount: 0,
          hasChildren: false,
          parentId: group.id,
        };
        return {
          ...group,
          childCount: group.childCount + 1,
          hasChildren: true,
          children: [...(group.children || []), newChild],
        };
      }
      return group;
    }));
  };

  const filteredGroups = groups.reduce((acc, group) => {
    if (group.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc.push(group);
      if (expandedGroups[group.id] && group.children) {
        group.children.forEach(child => {
          acc.push(child);
          if (expandedGroups[child.id] && child.children) {
            acc.push(...child.children);
          }
        });
      }
    }
    return acc;
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (<Box sx={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: `${params.row.level * 20}px`,
          }}>
            {params.row.hasChildren && (<IconButton
                    size="small"
                    onClick={() => setExpandedGroups({
                      ...expandedGroups,
                      [params.row.id]: !expandedGroups[params.row.id],
                    })}
                >
                  {expandedGroups[params.row.id] ?
                      <FaChevronDown/> :
                      <FaChevronRight/>}
                </IconButton>)}
            {params.value}
          </Box>),
    }, {
      field: 'childCount', headerName: 'Total Child', width: 150,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
            {params.row.childCount}
          </Box>
      )
    }, {
      field: 'actions', headerName: '', width: 150,
      renderCell: (params) => (<Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
            <Tooltip title="Add Child Group">
              <IconButton onClick={() => handleAddChild(params.row.id)}>
                <FaPlus/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Group">
              <IconButton onClick={() => handleDeleteGroup(params.row.id)}>
                <FaTrash/>
              </IconButton>
            </Tooltip>
          </Box>),
    }];

  return (<Box mt={5}
               sx={{height: 'auto', display: 'flex', flexDirection: 'column'}}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2,
        }}>
          <TextField
              placeholder="Search groups..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              size="small"
              sx={{width: 200}}
          />
          <Button
              variant="contained"
              onClick={() => setIsOpen(true)}
              size="small"
              sx={{
                backgroundColor: '#1677FF',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '6px',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400,
                minWidth: '32px',
                minHeight: '32px',
                boxShadow: 'none',
              }}
          >
            Create
          </Button>
        </Box>

        <Box sx={{flex: 1, width: '100%'}}>
          <DataGrid
              rows={filteredGroups}
              columns={columns}
              autoHeight={false}
              loading={loading}
              disableSelectionOnClick
              hideFooter={true}
              editable: true
              processRowUpdate={() => {

              }}
              sx={{
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#fff',
                },
                '& .MuiCheckbox-root': {
                  color: '#000',
                },
                '& .Mui-checked': {
                  color: '#000 !important',
                },
                '& .MuiCheckbox-root.Mui-checked': {
                  backgroundColor: '#fdfdfd !important',
                },
                width: '100%',
                '& .MuiDataGrid-columnHeaders': {
                  color: '#000000E0',
                },
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader': {
                  background: '#FAFAFA',
                },
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle': {
                  fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500,
                },
              }}
          />
        </Box>

        <CreateGroup open={isOpen} onClose={handleCloseModal} />
      </Box>);
};

export default GroupManagement;