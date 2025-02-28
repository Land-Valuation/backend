import {Box, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getMembers, removeMemberFromGroup} from '@/api/group.js';
import { FaXmark } from "react-icons/fa6";
import {useTranslation} from 'react-i18next';

async function getMembersList(groupId) {
  return getMembers(groupId);
}

const MemberModal = ({open, onClose, groupId}) => {
  const {t} = useTranslation();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (open) {
      getMembersList(groupId).then((response) => {
        const {data} = response.data;
        setRows(data);
      });
    }
  }, [open]);

  const handleRemoveMember = async (memberId) => {
      await removeMemberFromGroup(memberId, groupId);
      getMembersList(groupId).then((response) => {
        const {data} = response.data;
        setRows(data);
      });
  }

  const columns = [
    {
      field: 'username',
      headerName: t('AdminTab.GroupTab.Form.Username'),
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      width: 120,
    },{
      field: 'fullname',
      headerName: t('AdminTab.GroupTab.Form.Fullname'),
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName ||
      ''}`
    }, {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (<Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <IconButton onClick={() => handleRemoveMember(params.row.id)}>
          <FaXmark sx={{fontSize: '10px'}}/>
        </IconButton>
      </Box>)
    }];

  return (<Box sx={{
    display: open ? 'block' : 'none',
    position: 'absolute',
    width: '100%',
    height: '100vh',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  }}>
    <Box onClick={onClose} sx={{
      display: open ? 'block' : 'none',
      position: 'absolute',
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 10,
    }}></Box>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '480px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      backdropFilter: blur('12px'),
      boxShadow: '0px 24px 24px 0px #0000001A',
      zIndex: 11,
    }}>
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <Box
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              left: '50%',
              top: '-20px',
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              boxShadow: '0px 6px 16px 0px #00000014',
              zIndex: 11,
              backgroundColor: '#FFF',
            }}
        >
          <Box sx={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            boxShadow: '0px 3px 6px -4px #0000001F',
          }}>
            <Box sx={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              boxShadow: '0px 9px 28px 8px #0000000D',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <CloseIcon/>
            </Box>
          </Box>
        </Box>
        <Box sx={{flex: 1, width: '100%'}}>
          <Box>
            <Typography component="label" sx={{
              display: 'block',
              mb: 0.5,
              fontWeight: 'bold',
              fontSize: '1.5em',
            }}>
              {t('AdminTab.GroupTab.Title.Group')}
            </Typography>
          </Box>

          <DataGrid
              rows={rows}
              columns={columns}
              autoHeight={false}
              slots={{ noRowsOverlay: () => <Box sx={{ display: "none" }} /> }}
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
                marginTop: '10px',
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
      </Box>
    </Box>
  </Box>);
};

MemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  groupId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default MemberModal;