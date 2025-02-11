import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PopConfirm from './customMUI/PopConfirm';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import ImagePreview from './ImagePreview';
import AddIcon from '@mui/icons-material/Add';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from "react-i18next";

const FileViewer = ({
  fileList,
  onDelete,
  onDownload,
  isDownload = false,
  isDelete = true,
  isView = true,
  isLoading = false,
  isConfirm = true,
  isCancel = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [fileListDisplay, setFileListDisplay] = useState([]);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    setFileListDisplay(fileList ?? []);
  }, [fileList]);

  // confirm
  const handleCancelDelete = () => {
    return false;
  };

  const handleConfirmDelete = (file) => {
    if (isCancel) return;
    handleDelete(file);
  };
  // end confirm

  // handle download file
  const handleDownload = (file) => {
    onDownload && onDownload(file);
  };

  const handleOpenPreview = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewImageUrl('');
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('file :>> ', file);
    }
  };

  // handle delete file
  const handleDelete = async (file) => {
    onDelete && onDelete(file);
  };

  // render image file
  const renderImage = (file) => {
    if (!file) {
      return null;
    }

    return (
      <Box
        sx={{
          width: '104px',
          height: '104px',
          position: 'relative',
          aspectRatio: '1/1',
          border: '1px solid #D9D9D9',
          borderRadius: '8px',
          padding: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover > div': {
            opacity: 1,
          }
        }}
      >
        <img
          src={file.url}
          alt={file.fileName}
          style={{ objectFit: 'cover', aspectRatio: '1/1', maxWidth: '100%', maxHeight: '100%', height: 'auto', borderRadius: '6px' }}
          loading="lazy"
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000073',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 10,
            borderRadius: '8px',
            
          }}
        >
          {isView && (
            <IconButton onClick={() => handleOpenPreview(file.url)} sx={{color: '#fff'}}>
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
          )}
          {isDownload && (
            <IconButton onClick={() => handleDownload(file)} sx={{color: '#fff'}}>
              <DownloadOutlinedIcon />
            </IconButton>
          )}
          {isDelete && (
            <>
              {isConfirm ? (
                <PopConfirm
                  title={'Thông báo'}
                  content={'Bạn có chắc chắn xóa không?'}
                  onConfirm={() => handleConfirmDelete(file)}
                  onCancel={handleCancelDelete}
                  okText={'Ok'}
                  cancelText={'No'}
                  showCancel={isCancel ? false : true}
                >
                <IconButton sx={{ color: '#fff' }}>
                  <DeleteOutlinedIcon />
                  </IconButton>
                </PopConfirm>
              ) : (
                  <IconButton onClick={() => handleDelete(file)} sx={{ color: '#fff' }}>
                  <DeleteOutlinedIcon  />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '8px',
        height: '100%',
        flexWrap: 'wrap',
      }}
    >
      {
        !isView &&
        <Box
          onClick={handleBoxClick}
          sx={{
            width: '104px',
            height: '104px',
            position: 'relative',
            aspectRatio: '1/1',
            border: '1px solid #D9D9D9',
            borderRadius: '8px',
            padding: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '4px',
            '&:hover > div': {
              opacity: 1,
            }
          }}
        >
          <AddIcon sx={{ color: '#595959', fontSize: '20px' }} />
          <Typography
            sx={{
              color: '#595959',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22px',
            }}
          >
            {t("Upload")}
          </Typography>
        </Box>
      }
      {
        isLoading &&
        <Box
          onClick={handleBoxClick}
          sx={{
            width: '104px',
            height: '104px',
            position: 'relative',
            aspectRatio: '1/1',
            border: '1px solid #D9D9D9',
            borderRadius: '8px',
            padding: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            '&:hover > div': {
              opacity: 1,
            }
          }}
        >
          <Box sx={{ width: '100%', position: 'relative' }}>
            <LinearProgress sx={{ backgroundColor: '#1677FF' }} />
          </Box>
        </Box>
      }
      {fileListDisplay.length > 0 &&
        fileListDisplay.map((file) => (
          <Box key={file.fileId}>{renderImage(file)}</Box>
        ))}
      {previewImageUrl && <ImagePreview
        imageUrl={previewImageUrl}
        open={previewOpen}
        onClose={handleClosePreview}
        altText="Preview image"
      />}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='image/png, image/jpeg, image/jpg'
      />
    </Box>
  );
};

FileViewer.propTypes = {
  fileList: PropTypes.arrayOf(
    PropTypes.shape({
      fileId: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  children: PropTypes.node,
  isDownload: PropTypes.bool,
  isDelete: PropTypes.bool,
  isView: PropTypes.bool,
  isLoading: PropTypes.bool,
  isConfirm: PropTypes.bool,
  isCancel: PropTypes.bool,
  textButtonYes: PropTypes.string,
};

export default FileViewer;