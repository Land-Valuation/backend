import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

const CustomTable = ({ dataSource, columns }) => {
  return (
    <TableContainer  sx={{ border: '1px solid #F0F0F0' , borderRadius: '8px'}}>
      <Table aria-label="custom table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#FAFAFA' }}>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align}>
                <Box 
                  sx={{
                    fontFamily: 'Poppins !important',
                    fontSize: '14px',
                    fontWeight: 'bold !important',
                    lineHeight: '22px',
                    color: '#000000E0',
                  }}>
                  {column.title}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row) => (
            <TableRow key={row.key || row.id}>
              {columns.map((column) => {
                const cellValue = row[column.dataIndex];
                return (
                  <TableCell
                    key={`${row.key || row.id}-${column.key}`}
                    align={column.align}
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      fontFamily: 'Poppins',
                    }}
                  >
                    {column.render ? column.render(cellValue, row) : cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
      align: PropTypes.oneOf(['left', 'center', 'right', 'inherit', 'justify']),
    })
  ).isRequired,
};

export default CustomTable;