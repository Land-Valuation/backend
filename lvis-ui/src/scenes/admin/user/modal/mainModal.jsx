    import {useCallback, useEffect, useState, useMemo} from 'react';
    import Box from '@mui/material/Box';
    import {useTranslation} from 'react-i18next';
    import PropTypes from 'prop-types';
    import CloseIcon from '@mui/icons-material/Close';
    import {getListGroup} from '@/service/group';
    import {Button, Typography} from '@mui/material';
    import DataTable from '@/components/datagridMUI/DataTable.jsx';
    import {MODAL_TYPE} from "@/utils/enums/admin.js";
    import {getRoleList} from "@/service/role.js";

    export default function MainModal({
                                             open,
                                             onClose,
                                             title,
                                             setSelectedId,
                                             selectedId,
                                             headerName,
                                             type
                                           }) {
      const {t} = useTranslation();
      const [rows, setRows] = useState([]);
      const [selectedCheckbox, setSelectedCheckbox] = useState([]);

      const columns = useMemo(() => [
        {
          field: 'name',
          headerName: headerName,
          flex: 1,
          editable: false,
          valueFormatter: (name) => {
            return name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
          },
        }], []);

      const fetchGroups = useCallback(async () => {
        const response = await getListGroup();
        setRows(response);
      }, []);

        const fetchRole = useCallback(async () => {
            const response = await getRoleList();
            setRows(response);
        }, []);

      useEffect(() => {
          if (type === MODAL_TYPE.GROUP_TYPE && open) {
              fetchGroups().then();
          }
      }, [open]);

      useEffect(() => {
          if (type === MODAL_TYPE.ROLE_TYPE && open) {
              fetchRole().then();
          }
      }, [open]);

        useEffect(() => {
            if (selectedId.length > 0) {
                setSelectedCheckbox(selectedId.map((item) => item.id));
            } else {
                setSelectedCheckbox([]);
            }
        }, [selectedId, open]);

      const handleSelectionChange = (newSelection) => {
         if (newSelection.length > 0) {
           const lastSelectedId = newSelection[newSelection.length - 1];
           const selectedRow = rows.find(row => row.id === lastSelectedId);
           if (selectedRow) {
             setSelectedCheckbox([{ id: selectedRow.id, name: selectedRow.name }]);
           }
         } else {
           setSelectedCheckbox([]);
         }
      };

      const handleAssign = () => {
        const selectedRows = rows.filter((row) => selectedCheckbox.includes(row.id));

        setSelectedId(selectedRows);
        onClose();
      };

      return (<Box sx={{width: '100%', marginTop: '40px', padding: 0}}>
        <Box sx={{
          display: open ? 'block' : 'none',
          position: 'absolute',
          width: '100%',
          height: '100vh',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
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
            zIndex: 21,
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
            zIndex: 22,
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
                    zIndex: 23,
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
              <Box>
                <Typography component="label" sx={{
                  display: 'block', mb: 0.5, fontWeight: 'bold', fontSize: '1.5em',
                }}>
                  {title}
                </Typography>
              </Box>
              <DataTable
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  onRowSelectionModelChange={handleSelectionChange}
                  selectionModel={selectedCheckbox}
              />
              <Box>
                <Button
                    sx={{
                      backgroundColor: '#1677FF',
                      color: '#fff',
                      textTransform: 'none',
                      borderRadius: '8px',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      boxShadow: 'none',
                      width: '100%',
                      height: '40px',
                    }}
                    variant="contained"
                    onClick={handleAssign}
                >
                  Assign
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>);
    }

    MainModal.propTypes = {
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
    };