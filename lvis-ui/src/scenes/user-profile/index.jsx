import React, { useState } from "react";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Switch,
  IconButton,
  Box,
  Chip,
  Alert,
  FormControlLabel,
  styled
} from "@mui/material";
import { FiEdit2, FiMapPin, FiMail, FiPhone, FiGlobe, FiBriefcase, FiCalendar, FiUser } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: "4px solid #fff",
  boxShadow: theme.shadows[3],
  margin: "0 auto",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)"
  }
}));

const CoverPhoto = styled(Box)({
  height: 200,
  width: "100%",
  backgroundImage: `url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative"
});

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp",
    experience: "8+ years",
    dob: "1990-01-01",
    gender: "Male",
    languages: ["English", "Spanish"],
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  });

  const [errors, setErrors] = useState({});

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5242880,
    multiple: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        newErrors.email = /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email address";
        break;
      case "phone":
        newErrors.phone = /^\+?[\d\s-]+$/.test(value) ? "" : "Invalid phone number";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const InfoItem = ({ icon: Icon, label, value, name }) => (
      <Grid item xs={12} sm={6} md={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Icon size={20} />
          {editMode ? (
              <TextField
                  fullWidth
                  name={name}
                  label={label}
                  value={value}
                  onChange={handleInputChange}
                  error={Boolean(errors[name])}
                  helperText={errors[name]}
                  size="small"
              />
          ) : (
              <Typography>
                <strong>{label}:</strong> {value}
              </Typography>
          )}
        </Box>
      </Grid>
  );

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ mb: 4, bgcolor: darkMode ? "grey.900" : "background.paper" }}>
          <CoverPhoto>
            <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  gap: 2
                }}
            >
              <FormControlLabel
                  control={
                    <Switch
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                    />
                  }
                  label="Dark Mode"
              />
              <IconButton
                  onClick={() => setEditMode(!editMode)}
                  sx={{ bgcolor: "background.paper" }}
              >
                <FiEdit2 />
              </IconButton>
            </Box>
          </CoverPhoto>
          <CardContent sx={{ mt: -10 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <StyledAvatar src={formData.avatar} alt={formData.fullName} />
                </div>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography variant="h4" gutterBottom>
                  {formData.fullName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {formData.jobTitle} at {formData.company}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
                  {formData.languages.map((lang) => (
                      <Chip key={lang} label={lang} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <InfoItem icon={FiUser} label="Full Name" value={formData.fullName} name="fullName" />
              <InfoItem icon={FiMail} label="Email" value={formData.email} name="email" />
              <InfoItem icon={FiPhone} label="Phone" value={formData.phone} name="phone" />
              <InfoItem icon={FiMapPin} label="Location" value={formData.location} name="location" />
              <InfoItem icon={FiBriefcase} label="Company" value={formData.company} name="company" />
              <InfoItem icon={FiGlobe} label="Experience" value={formData.experience} name="experience" />
              <InfoItem icon={FiCalendar} label="Date of Birth" value={formData.dob} name="dob" />
            </Grid>
          </Grid>

          {editMode && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Click on the avatar to upload a new profile picture. Maximum file size: 5MB
                </Alert>
              </Grid>
          )}
        </Grid>
      </Container>
  );
};

export default ProfilePage;