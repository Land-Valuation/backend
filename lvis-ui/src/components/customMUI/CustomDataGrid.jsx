import { useState } from "react";
import { IconButton, Button, SvgIcon } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function AddNewRowIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path
        d="M12.712 12.9051C13.2522 12.615 13.8705 12.4498 14.529 12.4498H14.5312C14.5982 12.4498 14.6295 12.3694 14.5803 12.3248C13.8956 11.7102 13.1133 11.2139 12.2656 10.856C12.2567 10.8516 12.2478 10.8493 12.2388 10.8449C13.625 9.83817 14.5268 8.20201 14.5268 6.35603C14.5268 3.29799 12.0536 0.820312 9.00222 0.820312C5.95088 0.820312 3.4799 3.29799 3.4799 6.35603C3.4799 8.20201 4.38168 9.83817 5.77008 10.8449C5.76115 10.8493 5.75222 10.8516 5.74329 10.856C4.74552 11.2779 3.85043 11.8828 3.08034 12.6551C2.3147 13.4194 1.70515 14.3254 1.2857 15.3225C0.873006 16.299 0.65028 17.3452 0.62945 18.4051C0.628855 18.429 0.633033 18.4527 0.64174 18.4748C0.650447 18.497 0.663506 18.5172 0.680148 18.5343C0.696789 18.5514 0.716677 18.5649 0.738638 18.5742C0.7606 18.5834 0.784191 18.5882 0.808022 18.5882H2.14508C2.24106 18.5882 2.32141 18.51 2.32365 18.4141C2.36829 16.6908 3.05802 15.077 4.279 13.8538C5.54016 12.5882 7.21874 11.8917 9.00445 11.8917C10.2701 11.8917 11.4844 12.2422 12.5312 12.8984C12.5581 12.9153 12.589 12.9249 12.6207 12.926C12.6525 12.9272 12.684 12.92 12.712 12.9051ZM9.00445 10.1953C7.98213 10.1953 7.02008 9.79576 6.29463 9.07031C5.9377 8.71431 5.65474 8.2912 5.46204 7.82535C5.26934 7.35951 5.17072 6.86015 5.17186 6.35603C5.17186 5.33147 5.57141 4.36719 6.29463 3.64174C7.01784 2.91629 7.9799 2.51674 9.00445 2.51674C10.029 2.51674 10.9888 2.91629 11.7143 3.64174C12.0712 3.99775 12.3542 4.42086 12.5469 4.8867C12.7396 5.35254 12.8382 5.85191 12.837 6.35603C12.837 7.38058 12.4375 8.34487 11.7143 9.07031C10.9888 9.79576 10.0268 10.1953 9.00445 10.1953ZM17.2143 15.5078H15.3393V13.6328C15.3393 13.5346 15.2589 13.4542 15.1607 13.4542H13.9107C13.8125 13.4542 13.7321 13.5346 13.7321 13.6328V15.5078H11.8571C11.7589 15.5078 11.6786 15.5882 11.6786 15.6864V16.9364C11.6786 17.0346 11.7589 17.115 11.8571 17.115H13.7321V18.99C13.7321 19.0882 13.8125 19.1685 13.9107 19.1685H15.1607C15.2589 19.1685 15.3393 19.0882 15.3393 18.99V17.115H17.2143C17.3125 17.115 17.3928 17.0346 17.3928 16.9364V15.6864C17.3928 15.5882 17.3125 15.5078 17.2143 15.5078Z"
        fill="#1677FF"
      />
    </SvgIcon>
  );
}
function RemoveRowIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18 ">
      <path
        d="M12.7111 12.1981C13.2512 11.9079 13.8695 11.7427 14.528 11.7427H14.5303C14.5972 11.7427 14.6285 11.6624 14.5794 11.6177C13.8946 11.0032 13.1123 10.5068 12.2646 10.149C12.2557 10.1445 12.2468 10.1423 12.2378 10.1378C13.624 9.13114 14.5258 7.49498 14.5258 5.649C14.5258 2.59096 12.0526 0.113281 9.00124 0.113281C5.9499 0.113281 3.47892 2.59096 3.47892 5.649C3.47892 7.49498 4.38071 9.13114 5.7691 10.1378C5.76017 10.1423 5.75124 10.1445 5.74231 10.149C4.74455 10.5709 3.84946 11.1758 3.07937 11.9481C2.31372 12.7124 1.70417 13.6183 1.28472 14.6155C0.87203 15.592 0.649303 16.6382 0.628474 17.6981C0.627878 17.7219 0.632057 17.7456 0.640764 17.7678C0.649471 17.79 0.66253 17.8102 0.679171 17.8273C0.695813 17.8443 0.7157 17.8579 0.737662 17.8671C0.759623 17.8764 0.783214 17.8811 0.807045 17.8811H2.1441C2.24008 17.8811 2.32044 17.803 2.32267 17.707C2.36731 15.9838 3.05705 14.37 4.27803 13.1468C5.53919 11.8811 7.21776 11.1847 9.00348 11.1847C10.2691 11.1847 11.4834 11.5352 12.5303 12.1914C12.5572 12.2083 12.588 12.2178 12.6198 12.219C12.6515 12.2202 12.683 12.213 12.7111 12.1981ZM9.00348 9.48828C7.98115 9.48828 7.0191 9.08873 6.29365 8.36328C5.93672 8.00728 5.65376 7.58417 5.46106 7.11832C5.26837 6.65248 5.16975 6.15312 5.17089 5.649C5.17089 4.62444 5.57044 3.66016 6.29365 2.93471C7.01687 2.20926 7.97892 1.80971 9.00348 1.80971C10.028 1.80971 10.9878 2.20926 11.7133 2.93471C12.0702 3.29072 12.3532 3.71383 12.5459 4.17967C12.7386 4.64551 12.8372 5.14487 12.8361 5.649C12.8361 6.67355 12.4365 7.63784 11.7133 8.36328C10.9878 9.08873 10.0258 9.48828 9.00348 9.48828ZM17.2133 14.8008H11.8562C11.7579 14.8008 11.6776 14.8811 11.6776 14.9794V16.2294C11.6776 16.3276 11.7579 16.4079 11.8562 16.4079H17.2133C17.3115 16.4079 17.3919 16.3276 17.3919 16.2294V14.9794C17.3919 14.8811 17.3115 14.8008 17.2133 14.8008Z"
        fill="#1F1F1F"
      />
    </SvgIcon>
  );
}

const CustomDataGrid = () => {
  const columns = [
    {
      field: "action",
      headerName: "",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ textAlign: "center" }}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => handleRemoveRow(params.id)}
          >
            <RemoveRowIcon />
          </IconButton>
        </div>
      ),
    },
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "firstName",
      headerName: "Member Type",
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Organization",
      editable: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Name",
      editable: true,
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Position",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
  ];

  const initialRows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 1000 },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const visibleColumns = columns.filter((column) => column.field !== "id");
  const [rows, setRows] = useState(initialRows);
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      name: "",
      age: "",
      email: "",
    };
    setRows((prevRows) => [newRow, ...prevRows]);
  };
  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <DataGrid
      rows={rows}
      columns={visibleColumns.map((column) =>
        column.field === "action"
          ? {
              ...column,
              renderHeader: () => (
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                >
                  <AddNewRowIcon />
                </IconButton>
              ),
            }
          : column
      )}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      disableColumnSorting
      disableColumnFilter
      disableColumnMenu
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          color: "#000000E0",
        },
        "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
          background: "#FAFAFA",
        },
        "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle": {
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 500,
        },
      }}
    />
  );
};

export default CustomDataGrid;
