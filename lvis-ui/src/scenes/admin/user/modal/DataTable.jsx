import {memo} from 'react'
import {DataGrid} from '@mui/x-data-grid';

const DataTable= ({rows, columns}) => {
  return (
      <>
        <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            localeText={{noRowsLabel: ''}}
            checkboxSelection
            disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#fff',
              }, '& .MuiCheckbox-root': {
                color: '#000',
              }, '& .Mui-checked': {
                color: '#000 !important',
              }, '& .MuiCheckbox-root.Mui-checked': {
                backgroundColor: '#fdfdfd !important',
              }, '& .MuiTablePagination-root': {display: 'none'},
              '& .MuiDataGrid-selectedRowCount': {
                display: 'none',
              },
            }}
        />
      </>
  )
}

export default memo(DataTable);