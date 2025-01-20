import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  SvgIcon,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const FileCard = styled(Box)(({ theme }) => ({
  border: "1px solid #F0F0F0",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  position: "relative",
  // marginBottom: "16px",
  backgroundColor: "#fff",
}));

const FileIcon = styled("img")({
  width: "50px",
  height: "50px",
});
const fileIcons = {
  pdf: "/PDF ico.svg",
  jpg: "/JPG ico.svg",
  png: "/JPG ico.svg",
  jpeg: "/JPG ico.svg",
  doc: "/DOC ico.svg",
  docx: "/DOC ico.svg",
  csv: "/CSV ico.svg",
  xlsx: "/CSV ico.svg",
  zip: "/ZIP ico.svg",
  ppt: "/PPT ico.svg",
  pptx: "/PPT ico.svg",
};
function DownloadIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M7.88736 10.6574C7.90072 10.6744 7.9178 10.6883 7.93729 10.6977C7.95678 10.7072 7.97818 10.7122 7.99986 10.7122C8.02154 10.7122 8.04294 10.7072 8.06243 10.6977C8.08192 10.6883 8.099 10.6744 8.11236 10.6574L10.1124 8.12701C10.1856 8.03415 10.1195 7.89665 9.99986 7.89665H8.67665V1.85379C8.67665 1.77522 8.61236 1.71094 8.53379 1.71094H7.46236C7.38379 1.71094 7.3195 1.77522 7.3195 1.85379V7.89487H5.99986C5.88022 7.89487 5.81415 8.03237 5.88736 8.12522L7.88736 10.6574ZM14.5356 10.0324H13.4641C13.3856 10.0324 13.3213 10.0967 13.3213 10.1752V12.9252H2.67843V10.1752C2.67843 10.0967 2.61415 10.0324 2.53557 10.0324H1.46415C1.38557 10.0324 1.32129 10.0967 1.32129 10.1752V13.7109C1.32129 14.027 1.57665 14.2824 1.89272 14.2824H14.107C14.4231 14.2824 14.6784 14.027 14.6784 13.7109V10.1752C14.6784 10.0967 14.6141 10.0324 14.5356 10.0324Z"
        fill="black"
        fill-opacity="0.88"
      />
    </SvgIcon>
  );
}
function DeleteIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <path
        d="M4.625 1.87402H4.5C4.56875 1.87402 4.625 1.81777 4.625 1.74902V1.87402H9.375V1.74902C9.375 1.81777 9.43125 1.87402 9.5 1.87402H9.375V2.99902H10.5V1.74902C10.5 1.19746 10.0516 0.749023 9.5 0.749023H4.5C3.94844 0.749023 3.5 1.19746 3.5 1.74902V2.99902H4.625V1.87402ZM12.5 2.99902H1.5C1.22344 2.99902 1 3.22246 1 3.49902V3.99902C1 4.06777 1.05625 4.12402 1.125 4.12402H2.06875L2.45469 12.2959C2.47969 12.8287 2.92031 13.249 3.45313 13.249H10.5469C11.0813 13.249 11.5203 12.8303 11.5453 12.2959L11.9313 4.12402H12.875C12.9438 4.12402 13 4.06777 13 3.99902V3.49902C13 3.22246 12.7766 2.99902 12.5 2.99902ZM10.4266 12.124H3.57344L3.19531 4.12402H10.8047L10.4266 12.124Z"
        fill="#FF4D4F"
      />
    </SvgIcon>
  );
}
const CustomUploadFile = ({ files, onDelete }) => {
  const handleDownload = (fileId) => {
    const file = files.find((file) => file.id === fileId);
    if (file) {
      const blob = new Blob([new ArrayBuffer(file.size)], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (fileId) => {
    if (onDelete) {
      onDelete(fileId);
    }
  };
  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };
  const formatUploadTime = (time) => {
    const date = new Date(time);
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const optionsDate = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
    const formattedDate = date.toLocaleDateString("en-GB", optionsDate);

    const finalDate = `${formattedTime}, ${formattedDate.replace(/\//g, "-")}`;
    return finalDate;
  };
  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        // padding: "0 24px 24px 24px",
        marginTop: "24px",
        marginTop: files.length === 0 ? 0 : "32px",
      }}
    >
      {files.map((file) => {
        const fileExtension = getFileExtension(file.name);
        const iconSrc = fileIcons[fileExtension];
        return (
          <FileCard
            key={file.name}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <FileIcon src={iconSrc} alt={`${fileExtension} icon`} />
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  textOverflow: "ellipsis",
                  maxWidth: "210px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {file.name}
              </Typography>
              <Box sx={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {formatFileSize(file.size)}
                </Typography>
                <Divider orientation="vertical" sx={{ height: "16px" }} />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  At: {formatUploadTime(file.uploadTime)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "8px",
                    boxShadow: "0px 6px 16px 0px #00000014",
                    // boxShadow: "0px 3px 6px -4px #0000001F",
                    // boxShadow: "0px 9px 28px 8px #0000000D",
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{ display: "flex", gap: "8px" }}
                >
                  <DownloadIcon />
                  <Box onClick={() => handleDownload(file.id)}>Download</Box>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{ display: "flex", gap: "8px" }}
                >
                  <DeleteIcon />
                  <Box
                    onClick={() => handleDelete(file.id)}
                    sx={{ color: "#FF4D4F" }}
                  >
                    Delete
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </FileCard>
        );
      })}
    </Box>
  );
};

export default CustomUploadFile;
