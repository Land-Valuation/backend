import React from "react";
import { Box, Button, Typography, SvgIcon } from "@mui/material";
import { styled } from "@mui/system";

const FileCard = styled(Box)(({ theme }) => ({
  border: "1px solid #F0F0F0",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  position: "relative",
  marginBottom: "16px",
  backgroundColor: "#fff",
}));

const FileIcon = styled("img")({
  width: "50px",
  height: "50px",
});
const fileIcons = {
  pdf: "/PDF ico.svg",
  jpg: "/JPG ico.svg",
  jpeg: "/JPG ico.svg",
  doc: "/DOC ico.svg",
  docx: "/DOC ico.svg",
  csv: "/CSV ico.svg",
  xlsx: "/CSV ico.svg",
  zip: "/ZIP ico.svg",
  ppt: "/PPT ico.svg",
  pptx: "/PPT ico.svg",
};

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
    return date.toLocaleString();
  };
  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
      }}
    >
      {files.map((file) => {
        const fileExtension = getFileExtension(file.name);
        const iconSrc = fileIcons[fileExtension];
        return (
          <FileCard key={file.name} sx={{ display: "flex" }}>
            <FileIcon src={iconSrc} alt={`${fileExtension} icon`} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {file.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {formatFileSize(file.size)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888" }}>
              At: {formatUploadTime(file.uploadTime)}
            </Typography>
            <Box sx={{ marginTop: "8px" }}>
              <Button
                variant="contained"
                onClick={() => handleDownload(file.id)}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </Button>
            </Box>
          </FileCard>
        );
      })}
    </Box>
  );
};

export default CustomUploadFile;
