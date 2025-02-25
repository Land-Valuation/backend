import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Popover, Typography,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {FaChevronRight, FaChevronDown, FaPlus} from 'react-icons/fa';
import {getListGroup} from '@/service/group';
import CreateGroup from '@/scenes/admin/group/modal';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {useTranslation} from 'react-i18next';
import {deleteGroup, updateGroup} from '@/api/group.js';
import {HTTP_CODE} from '@/utils/constant.js';

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
      level: level,
      children: children,
    };
  });
}

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [createComplete, setCreateComplete] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [parentId, setParentId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const {t} = useTranslation();

  function getList() {
    getListGroup(true).then((response) => {
      const {data} = response.data;
      setGroups(convertGroups(data));
    });
  }

  useEffect(() => {
    if (setCreateComplete) {
      getList();
      setCreateComplete(false);
    }
  }, [createComplete]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenConfirm = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(row);
  };

  const handleCloseConfirm = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDeleteGroup = async () => {
    if (selectedId.id && !selectedId.hasChildren) {
      const id = selectedId.id;
      const response = await deleteGroup(id);

      if (response.status === HTTP_CODE.SUCCESS) {
        getList();
      }
    }

    handleCloseConfirm();
  };

  const handleAddChild = (parentId) => {
    setParentId(parentId);
    setIsOpen(true);
  };

  const handleProcessRowUpdate = async (newRow) => {
    const id = newRow.id;
    const name = newRow.name;

    await updateGroup({
      name
    }, id)

    return newRow;
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
      editable: true,
      flex: 1,
      renderCell: (params) => (<Box sx={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: `${params.row.level * 40}px`,
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
      ),
    }, {
      field: 'actions', headerName: '', width: 150,
      renderCell: (params) => (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <IconButton sx={{color: 'blue'}}
                    onClick={() => handleAddChild(params.row.id)}>
          <FaPlus sx={{ fontSize: '10px' }}/>
        </IconButton>
        <IconButton color="error"
                    onClick={(event) => handleOpenConfirm(event,
                        params.row)}>
          <DeleteIcon/>
        </IconButton>

        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseConfirm}
            anchorOrigin={{
              vertical: 'center', horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center', horizontal: 'left',
            }}
        >
          <div style={{
            padding: '10px', display: 'flex', flexDirection: 'column',
          }}>
            <Typography>{t('AdminTab.User.Message.Delete Confirm')}</Typography>
            <div style={{
              display: 'flex', justifyContent: 'flex-end', marginTop: '10px',
            }}>
              <Button size="small" color="primary"
                      onClick={handleCloseConfirm} sx={{color: '#000'}}>
                {t('AdminTab.User.Form.Button.Cancel')}
              </Button>
              <Button
                  size="small"
                  color="error"
                  onClick={handleDeleteGroup}
                  sx={{marginLeft: '10px'}}
              >
                {t('AdminTab.User.Form.Button.Delete')}
              </Button>
            </div>
          </div>
        </Popover>
      </div>),
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
          disableSelectionOnClick
          hideFooter={true}
          editable: true
          processRowUpdate={handleProcessRowUpdate}
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

    <CreateGroup open={isOpen} onClose={handleCloseModal} parentId={parentId}
                 createComplete={setCreateComplete}/>
  </Box>);
};

export default GroupManagement;