import React from "react";
import Header from "../../../components/Header";
import BaseInside from "../base/BaseInside";
import {
  Box,
  Button,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { display, styled } from "@mui/system";
import Footer from "../../../components/Footer";

function createData(
  year,
  status,
  province,
  issue,
  area,
  title,
  member,
  duration,
  date
) {
  return { year, status, province, issue, area, title, member, duration, date };
}

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#FAFAFA",
  fontWeight: 500,
  fontFamily: "Poppins",
  fontSize: "14px",
  color: "#000000E0",
});

const rows = [
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
  createData(
    "2021",
    "Approved",
    "Kigali",
    "Kigali City",
    "Kigali City",
    "Land Valuation",
    "John Doe",
    "3 months",
    "12/12/2021"
  ),
];

const Valuation = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        m="1.5rem 2.5rem"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100% - 6.5rem)",
        }}
      >
        <Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", marginBottom: "32px" }}
          >
            <Header
              title="Land Valuation"
              subtitle="Find your land valuation materials."
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#1677FF",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  textWrap: "nowrap",
                }}
              >
                New Valuation
              </Button>
              <Button
                sx={{
                  backgroundColor: "#fff",
                  color: "#00000073",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  minWidth: "32px",
                  minHeight: "32px",
                  padding: 0,
                }}
                variant="contained"
              >
                <MoreVertIcon />
              </Button>
            </Box>
          </Box>
          <TableContainer
            sx={{ border: "1px solid #F0F0F0", borderRadius: "8px" }}
            component={Paper}
          >
            <Table
              sx={{
                minWidth: 650,
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Base Year</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Province</StyledTableCell>
                  <StyledTableCell>Issued to Local</StyledTableCell>
                  <StyledTableCell>Applied Area</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Evaluation Member</StyledTableCell>
                  <StyledTableCell>Committee Duration</StyledTableCell>
                  <StyledTableCell>Decision Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.year}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.province}</TableCell>
                    <TableCell>{row.issue}</TableCell>
                    <TableCell>{row.area}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.member}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* <Box
        mt="40px"
        height="75.25vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <BaseInside />        
      </Box> */}
      </Box>
      <Box>
        <Divider />
        <Footer />
      </Box>
    </>
  );
};

export default Valuation;
