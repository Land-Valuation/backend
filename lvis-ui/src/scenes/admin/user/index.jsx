import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Popover, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserModal from '@/scenes/admin/user/modal';
import {getListUser, deleteUser} from '@/service/user';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export default function UseTabCustom() {
  const [searchText, setSearchText] = useState('');
  const {t} = useTranslation();
  const [isOpenCustomer, setIsOpenCustomer] = useState(false);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [createComplete, setCreateComplete] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCreateCustomer = () => {
    setEditUserId(null);
    setIsOpenCustomer(true);
  };

  const handleCloseCreateCustomer = () => {
    setIsOpenCustomer(false);
  };

  const handleOpenConfirm = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleCloseConfirm = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
    setIsOpenCustomer(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {

      const response = await deleteUser(selectedUserId);

      if (response) {
        setRows(
            (prevRows) => prevRows.filter((row) =>
                row.id !== selectedUserId));
      }

      handleCloseConfirm();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      return await getListUser();
    };

    fetchUsers().then(response => {
      setRows(response);
    });

  }, []);

  useEffect(() => {
    if (createComplete) {
      const fetchUsers = async () => {
        return await getListUser();
      };

      fetchUsers().then(response => {
        setRows(response);
      });

      setCreateComplete(false);
    }
  }, [createComplete]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      setFilteredRows(rows);
    } else {
      const lowerSearch = debouncedSearch.toLowerCase();
      setFilteredRows(
          rows.filter((user) =>
              user.username.toLowerCase().includes(lowerSearch) ||
              user.email.toLowerCase().includes(lowerSearch)
          )
      );
    }
  }, [debouncedSearch, rows]);
  const columns = [
    {
      field: 'username',
      headerName: t('AdminTab.User.Form.Label.Username'),
      flex: 1,
      editable: false,
    }, {
      field: 'email',
      headerName: t('AdminTab.User.Form.Label.Email'),
      flex: 2,
      editable: false,
    }, {
      field: 'firstName',
      headerName: t('AdminTab.User.Form.Label.Firstname'),
      flex: 1,
      editable: false,
    }, {
      field: 'lastName',
      headerName: t('AdminTab.User.Form.Label.Lastname'),
      flex: 1,
      editable: false,
    }, {
      field: 'enabled',
      headerName: t('AdminTab.User.Form.Label.Status'),
      flex: 1,
      editable: false,
      valueGetter: (value, row) => `${row.enabled === true ? 'Active' : 'Inactive'}`,
    }, {
      field: 'fullName',
      headerName: t('AdminTab.User.Form.Label.Fullname'),
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName ||
      ''}`,
    }, {
      field: 'actions',
      headerName: '',
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <IconButton sx={{color: 'blue'}}
                    onClick={() => handleEditUser(params.row.id)}>
          <EditIcon/>
        </IconButton>
        <IconButton color="error"
                    onClick={(event) => handleOpenConfirm(event,
                        params.row.id)}>
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
                  onClick={handleDeleteUser}
                  sx={{marginLeft: '10px'}}
              >
                {t('AdminTab.User.Form.Button.Delete')}
              </Button>
            </div>
          </div>
        </Popover>
      </div>),
    }];

  return (<Box sx={{width: '100%', marginTop: '40px', padding: 0}}>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
    >
      <TextField
          label={t('AdminTab.User.Search')}
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearchChange}
          sx={{
            width: '300px', '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: '#ccc',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ccc',
              },
              '& [class*="MuiFormLabel-root"].MuiInputLabel-root.Mui-focused': {
                color: 'black !important',
              },
            },
          }}
      />
      <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCustomer}
          sx={{
            backgroundColor: "#1677FF",
            color: "#fff",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            minWidth: "32px",
            minHeight: "32px",
            boxShadow: "none",
          }}
      >
        {t('AdminTab.User.Form.Button.Register')}
      </Button>
    </Box>


    <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection={false}
        disableRowSelectionOnClick
        pageSizeOptions={[10]}
        sx={{
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#fff',
          }, '& .MuiCheckbox-root': {
            color: '#000',
          }, '& .Mui-checked': {
            color: '#000 !important',
          }, '& .MuiCheckbox-root.Mui-checked': {
            backgroundColor: '#fdfdfd !important',
          },
          width: '100%',
          '& .MuiDataGrid-columnHeaders': {
            color: '#000000E0',
          },
          '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader':
              {
                background: '#FAFAFA',
              },
          '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle':
              {
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 500,
              },
        }}
    />

    <UserModal open={isOpenCustomer}
               title={editUserId !== null ?
                   t('AdminTab.User.Form.Label.Update') :
                   t('AdminTab.User.Form.Label.Create')}
               onClose={handleCloseCreateCustomer}
               userId={editUserId}
               createComplete={setCreateComplete}
    />
  </Box>);
}