import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Popover,
} from "@mui/material";
import { styled } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DownloadIcon from "../../assets/icons/land-valuation/DownloadIcon";
import DeleteIcon from "../../assets/icons/land-valuation/DeleteIcon";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { FORMAT_DATE } from "../../utils/constant";

const FileCardStyled = styled(Box)(() => ({
  border: "1px solid #F0F0F0",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  position: "relative",
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

const FileCardComponent = ({ file, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (file) => {
    if (onDelete) {
      onDelete(file);
    }
    setTimeout(() => {
      handleClose();
    }, 0);
  };

  const getFileExtension = (fileName) => {
    return fileName ? fileName.split(".").pop().toLowerCase() : "";
  };

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const fileExtension = getFileExtension(file?.name);
  const iconSrc = fileIcons[fileExtension];

  const handleDownload = async (file) => {
    console.log('file :>> ', file);
  };

  return (
    <FileCardStyled
      sx={{ display: "flex", justifyContent: "space-between", gap: "16px" }}
    >
      <FileIcon src={iconSrc} alt={`${fileExtension} icon`} />
      <Box>
        <Typography
          sx={{
            color: "#000000E0",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            textOverflow: "ellipsis",
            maxWidth: "210px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {file.name}
        </Typography>
        <Box sx={{ display: "flex", gap: "12px", marginTop: "4px" }}>
          <Typography variant="body2" sx={{ color: "#888" }}>
            {formatFileSize(file.size)}
          </Typography>
          {file.creationTime && (
            <Box>
              <Divider orientation="vertical" sx={{ height: "auto" }} />
              <Typography variant="body2" sx={{ color: "#888" }}>
                At: {dayjs(file.creationTime).format(FORMAT_DATE.HM_DMY)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Box aria-describedby={id} variant="contained" onClick={handleClick}>
          <MoreHorizIcon sx={{ color: "#888" }} />
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}>
            {
              file?.id && (
                <Box Box sx={{ display: "flex", gap: "8px" }}>
                  <DownloadIcon />
                  <Box onClick={() => handleDownload(file)}>Download</Box>
                </Box>
              )
            }
            <Box sx={{ display: "flex", gap: "8px" }}>
              <DeleteIcon color={"#FF4D4F"} />
              <Box
                onClick={() => handleDelete(file)}
                sx={{ color: "#FF4D4F" }}
              >
                Delete
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>
    </FileCardStyled>
  );
};

FileCardComponent.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    creationTime: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

const CustomUploadFile = ({ files, onDelete }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }}
    >
      {files.map((file) => (
        <FileCardComponent
          key={file.id}
          file={file}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

CustomUploadFile.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      creationTime: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func,
};

export default CustomUploadFile;