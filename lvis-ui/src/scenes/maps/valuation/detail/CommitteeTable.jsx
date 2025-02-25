import { IconButton, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RemoveRowIcon from '../../../../assets/icons/land-valuation/RemoveRowIcon';
import AddNewRowIcon from '../../../../assets/icons/land-valuation/AddNewRowIcon';
import PropTypes from 'prop-types';
import { useGetAllMemberTypesQuery } from '../../../../state/memberTypeApi';

const CustomSelectEditCell = (props) => {
  const { id, value, field, api } = props;
  const { data: allMemberTypes } = useGetAllMemberTypesQuery();
  const [memberTypeList, setMemberTypeList] = useState([]);

  useEffect(() => {
    if (allMemberTypes && allMemberTypes.length > 0) {
      setMemberTypeList(allMemberTypes);
    }
  }, [allMemberTypes]);

  const handleChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.value });
  };

  return (
    <Select
      value={value || ""}
      onChange={handleChange}
      fullWidth
      variant="standard"
    >
      {memberTypeList.map((type) => (
        <MenuItem key={type.code} value={type.display_value}>
          {type.display_value}
        </MenuItem>
      ))}
    </Select>
  );
};

CustomSelectEditCell.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string,
  field: PropTypes.string.isRequired,
  api: PropTypes.shape({
      setEditCellValue: PropTypes.func.isRequired,
  }).isRequired,
};

const CommitteeTable = ({ onDataChange, initialData }) => {
  const { t } = useTranslation();

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
      field: "memberType",
      headerName: t("Member Type"),
      editable: true,
      flex: 1,
      renderEditCell: (params) => <CustomSelectEditCell {...params} />,
    },
    {
      field: "organization",
      headerName: t("Organization"),
      editable: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: t("Name"),
      editable: true,
      flex: 1,
    },
    {
      field: "position",
      headerName: t("Position"),
      editable: true,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: t("Phone Number"),
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: t("Email"),
      editable: true,
      flex: 1,
    },
  ];

  const visibleColumns = columns.filter((column) => column.field !== "id");
  const [rows, setRows] = useState(initialData || []);
  const handleAddRow = () => {
    const newRow = {
      id: Date.now().toString(),
      memberType: "",
      organization: "",
      name: "",
      position: "",
      mobile: "",
      email: "",
      isNew: true,
    };
    setRows((prevRows) => [newRow, ...prevRows]);
  };

  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? { ...newRow } : row
    );
    setRows(updatedRows);
    return newRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.error("Lỗi khi cập nhật hàng:", error);
  };

  const { data: allMemberTypes } = useGetAllMemberTypesQuery();
  const [memberTypeList, setMemberTypeList] = useState([]);

  useEffect(() => {
    if (allMemberTypes && allMemberTypes.length > 0) {
      setMemberTypeList(allMemberTypes);
    }
  }, [allMemberTypes]);

  useEffect(() => {
    const convertData = rows.map(item => {
      const memberType = memberTypeList.find(el => el.display_value === item.memberType)
      return {
        ...item,
        memberTypeCode: memberType ? memberType?.code : '',
        memberPosition: item.position,
      }
    })
    onDataChange(convertData);
  }, [onDataChange, rows]);

  useEffect(() => {
    if (initialData) {
      setRows(initialData);
    }
  }, [initialData]);

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
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      sx={{
        width: "100%",
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

CommitteeTable.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    memberTypeCode: PropTypes.string,
    organization: PropTypes.string,
    name: PropTypes.string,
    memberPosition: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
  })),
};

export default CommitteeTable;