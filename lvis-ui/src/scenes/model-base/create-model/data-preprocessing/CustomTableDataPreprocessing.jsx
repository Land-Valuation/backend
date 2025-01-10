import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import PropTypes from 'prop-types';

const CustomTableDataPreprocessing = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: '60px' }}>
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {row.id}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '120px' }}>
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {row.value1}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '120px' }}>
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {row.value2}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

CustomTableDataPreprocessing.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value1: PropTypes.number.isRequired,
      value2: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomTableDataPreprocessing