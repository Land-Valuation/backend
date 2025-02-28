import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TableSortLabel,
  Typography, // Import Typography
} from "@mui/material";
import { useState, useMemo } from "react";

const CustomTable = ({
  dataSource,
  columns,
  rowStyle,
  cellStyle,
  onSort = undefined,
  hasCellBorders = false,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);
  console.log("dataSource", dataSource);

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    if (onSort) {
      onSort(key, direction);
    }
  };

  const defaultCellStyle = {
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Poppins",
    ...(hasCellBorders ? { border: "1px solid #F0F0F0" } : {}), // Conditional border
  };

  const headerCellStyle = {
    fontFamily: "Poppins !important",
    fontSize: "14px",
    fontWeight: "bold !important",
    lineHeight: "22px",
    color: "#000000E0",
    ...(hasCellBorders ? { border: "1px solid #F0F0F0" } : {}),
  };

  return (
    <TableContainer sx={{ border: "1px solid #F0F0F0", borderRadius: "8px" }}>
      <Table
        aria-label="custom table"
        sx={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            {columns.map((column) => {
              if (column.rowSpan === 2) {
                return (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    rowSpan={column.rowSpan}
                    sortDirection={
                      sortConfig && sortConfig.key === column.key
                        ? sortConfig.direction
                        : false
                    }
                    sx={{
                      ...headerCellStyle,
                      borderBottom: hasCellBorders
                        ? "1px solid #F0F0F0"
                        : undefined,
                    }}
                  >
                    <Box
                      sx={{
                        cursor: column.sortable ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center",
                        textAlign: column.align,
                      }}
                      onClick={
                        column.sortable
                          ? () => handleSort(column.key)
                          : undefined
                      }
                    >
                      {column.title}
                      {column.sortable && (
                        <TableSortLabel
                          active={sortConfig && sortConfig.key === column.key}
                          direction={
                            sortConfig && sortConfig.key === column.key
                              ? sortConfig.direction
                              : "asc"
                          }
                          onClick={
                            column.sortable
                              ? () => handleSort(column.key)
                              : undefined
                          }
                        />
                      )}
                    </Box>
                  </TableCell>
                );
              } else if (column.colSpan) {
                return (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    colSpan={column.colSpan}
                    sx={headerCellStyle}
                  >
                    <Box
                      sx={{
                        textAlign: column.align,
                      }}
                    >
                      {column.title}
                    </Box>
                  </TableCell>
                );
              }
              return null;
            })}
          </TableRow>
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            {columns.map((column) => {
              if (!column.rowSpan && !column.colSpan) {
                return (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    sortDirection={
                      sortConfig && sortConfig.key === column.key
                        ? sortConfig.direction
                        : false
                    }
                    sx={headerCellStyle}
                  >
                    <Box
                      sx={{
                        cursor: column.sortable ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          column.align === "right"
                            ? "flex-end"
                            : column.align === "center"
                            ? "center"
                            : "flex-start",
                        textAlign: column.align,
                        width: "100%",
                      }}
                      onClick={
                        column.sortable
                          ? () => handleSort(column.key)
                          : undefined
                      }
                    >
                      {column.title}
                      {column.sortable && (
                        <TableSortLabel
                          active={sortConfig && sortConfig.key === column.key}
                          direction={
                            sortConfig && sortConfig.key === column.key
                              ? sortConfig.direction
                              : "asc"
                          }
                          onClick={
                            column.sortable
                              ? () => handleSort(column.key)
                              : undefined
                          }
                        />
                      )}
                    </Box>
                  </TableCell>
                );
              }
              return null;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {memoizedDataSource.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box
                  sx={{
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    No data available
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            memoizedDataSource.map((row, rowIndex) => {
              return (
                <TableRow
                  key={row.key || row.id}
                  sx={rowStyle ? rowStyle(row, rowIndex) : {}}
                >
                  {columns.map((column, colIndex) => {
                    const cellValue = row[column.dataIndex];
                    if (column.dataIndex) {
                      return (
                        <TableCell
                          key={`${row.key || row.id}-${column.key}`}
                          align={column.align}
                          sx={{
                            ...defaultCellStyle,
                            ...(cellStyle
                              ? cellStyle(
                                  cellValue,
                                  row,
                                  rowIndex,
                                  column,
                                  colIndex
                                )
                              : {}),
                          }}
                        >
                          {column.render
                            ? column.render(cellValue, row)
                            : cellValue}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowStyle: PropTypes.func,
  cellStyle: PropTypes.func,
  onSort: PropTypes.func,
  hasCellBorders: PropTypes.bool, // New prop for controlling cell borders
};

// CustomTable.defaultProps = {
//   onSort: undefined,
//   hasCellBorders: false, // Default to no borders
// };

export default CustomTable;