import {memo} from 'react'
import {DataGrid} from '@mui/x-data-grid';

const DataTable= ({rows, columns, checkboxSelection, onRowSelectionModelChange, selectionModel}) => {
  return (
      <>
        <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            localeText={{noRowsLabel: ''}}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick
            disableSelectionOnClick
            onRowSelectionModelChange={(selection) => {
                if (selection.length > 0) {
                    const lastSelected = [selection[selection.length - 1]];
                    onRowSelectionModelChange(lastSelected);
                }
            }}
            selectionModel={selectionModel}
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