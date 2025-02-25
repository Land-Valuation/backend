import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import {
  FiEdit2,
  FiHash,
  FiLink,
  FiMail,
  FiStar,
  FiShield,
} from 'react-icons/fi';
import {useDropzone} from 'react-dropzone';
import {useEffect, useState} from 'react';
import {getUser, updateUser} from '@/api/user.js';
import UserService from '@/state/UserService';
import {Button} from '@mui/material';

const StyledAvatar = styled(Avatar)(({theme}) => ({
  width: 150,
  height: 150,
  border: '4px solid #fff',
  boxShadow: theme.shadows[3],
  margin: '0 auto',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CoverPhoto = styled(Box)({
  height: 200,
  width: '100%',
  backgroundImage: `url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
});

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => ({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    roleName: '',
    avatar: '',
    status: '',
  }));
  const [loading, setLoading] = useState(true);

  const currentToken = UserService.getTokenParsed();

  useEffect(() => {
    const userId = currentToken.sub ?? '';
    const RoleName = currentToken.realm_access?.roles[0];

    setLoading(true);

    getUser(userId).then(response => {
      const {data} = response.data;

      setFormData({
        id: data.id ?? '',
        userName: data.username,
        fullName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        email: data.email ?? '',
        roleName: `${RoleName.charAt(0).toUpperCase()}${RoleName.slice(1)}`,
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
        status: 'Enabled',
      });
    }).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    updateUser(
        {firstname: formData.firstName, lastname: formData.lastName},
        formData.id,
    ).then(() => {
      setFormData({
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
      });

      setEditMode(false);
    }).catch(err => console.error(err));
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({...formData, avatar: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop, accept: {'image/*': []}, maxSize: 5242880, multiple: false,
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setFormData({...formData, [name]: value});
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = {...errors};
    switch (name) {
      case 'email':
        newErrors.email = /^\S+@\S+\.\S+$/.test(value) ?
            '' :
            'Invalid email address';
        break;
      case 'phone':
        newErrors.phone = /^\+?[\d\s-]+$/.test(value) ?
            '' :
            'Invalid phone number';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const InfoItem = ({icon: Icon, label, value, name}) => (
      <Grid item xs={12} sm={6} md={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Icon size={20}/>
          <TextField
              fullWidth
              name={name}
              label={label}
              value={value}
              onChange={handleInputChange}
              error={Boolean(errors[name])}
              helperText={errors[name]}
              size="small"
              disabled={!editMode}
          />
        </Box>
      </Grid>);

  return (<Container maxWidth="lg" sx={{py: 4}}>
    {loading ? (<Box display="flex" justifyContent="center" alignItems="center"
                     minHeight="60vh">
      <CircularProgress/>
    </Box>) : (<>
      <Card sx={{mb: 4, bgcolor: 'background.paper'}}>
        <CoverPhoto>
          <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 2,
              }}
          >
            <IconButton
                onClick={() => setEditMode(!editMode)}
                sx={{bgcolor: 'background.paper'}}
            >
              <FiEdit2/>
            </IconButton>
          </Box>
        </CoverPhoto>
        <CardContent sx={{mt: -10}}>
          <Grid container spacing={4}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <StyledAvatar src={formData.avatar}
                              alt={formData.fullName}/>
              </div>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h4" gutterBottom>
                {formData.fullName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {formData.roleName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3} mt={1}>
            <InfoItem icon={FiStar} label="First Name"
                      value={formData.firstName} name="firstName"/>
            <InfoItem icon={FiHash} label="Username"
                      value={formData.userName} name="userName"/>
            <InfoItem icon={FiMail} label="Email" value={formData.email}
                      name="email"/>
            <InfoItem icon={FiStar} label="Last Name"
                      value={formData.lastName} name="lastName"/>
            <InfoItem icon={FiLink} label="Role"
                      value={formData.roleName} name="roleId"/>
            <InfoItem icon={FiShield} label="Status"
                      value={formData.status} name="roleId"/>
          </Grid>
          {editMode && (
              <Box display="flex" justifyContent="center" mt={5}>
                <Button variant="contained" onClick={handleSubmit} sx={{
                  backgroundColor: '#1677FF',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  boxShadow: 'none',
                  width: '10%',
                  height: '40px',
                }}>
                  Submit
                </Button>
              </Box>
          )}
        </Grid>
      </Grid>
    </>)}
  </Container>);
};

export default UserProfile;