import { MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const CommitteeTableForLocal = ({ initialData }) => {
  const { t } = useTranslation();

  const columns = [
    // { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "memberType",
      headerName: t("Member Type"),
      editable: false,
      flex: 1,
      renderEditCell: (params) => <CustomSelectEditCell {...params} />,
    },
    {
      field: "organization",
      headerName: t("Organization"),
      editable: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: t("Name"),
      editable: false,
      flex: 1,
    },
    {
      field: "position",
      headerName: t("Position"),
      editable: false,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: t("Phone Number"),
      editable: false,
      flex: 1,
    },
    {
      field: "email",
      headerName: t("Email"),
      editable: false,
      flex: 1,
    },
  ];

  const [rows, setRows] = useState(initialData || []);

  useEffect(() => {
    if (initialData) {
      setRows(initialData);
    }
  }, [initialData]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
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

CommitteeTableForLocal.propTypes = {
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

export default CommitteeTableForLocal;