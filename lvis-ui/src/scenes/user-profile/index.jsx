import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {styled} from '@mui/system';
import {FaEdit, FaSave, FaTimes} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {getUser, updateProfile} from '@/api/user.js';
import UserService from '@/state/UserService';
import Header from '@/components/Header.jsx';
import {useTranslation} from 'react-i18next';

const ProfileAvatar = styled(Avatar)(({theme}) => ({
  width: 150,
  height: 150,
  position: 'relative',
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
}));

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const {t} = useTranslation();

  const currentToken = UserService.getTokenParsed();

  useEffect(() => {
    const userId = currentToken.sub ?? '';
    const RoleName = currentToken.realm_access?.roles[0];

    getUser(userId).then(response => {
      const {data} = response.data;

      setUserData({
        id: data.id ?? '',
        fullName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        userName: data.username,
        email: data.email ?? '',
        role: `${RoleName.charAt(0).toUpperCase()}${RoleName.slice(1)}`,
        avatar: '',
        enabled: data.enabled,
        status: data.enabled ? 'Enabled' : 'Disabled',
      });
    });
  }, []);

  const handleProfileUpdate = () => {
    updateProfile(
        {firstname: userData.firstName, lastname: userData.lastName, enabled: userData.enabled},
        userData.id,
    ).then(() => {
      setUserData({
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`,
      });

      setEditMode(false);
    }).catch(err => console.error(err));
  };

  return (
      <Box m="1.5rem 2.5rem">
        <Header title={t('UserProfile.title')} subtitle="User information"/>
        <Box sx={{py: 4}}>
          <Paper elevation={3} sx={{p: 3, position: 'relative'}}>
            <Stack spacing={4} alignItems="center">
              <Box position="relative">
                <ProfileAvatar src={userData.profilePic} alt="Profile Picture"/>
              </Box>

              <Typography variant="h4" fontWeight="bold">
                {userData.fullName}
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                {!editMode ? (
                    <Button
                        startIcon={<FaEdit/>}
                        variant="contained"
                        onClick={() => setEditMode(true)}
                        sx={{
                          backgroundColor: '#1677FF',
                          color: '#fff',
                          textTransform: 'none',
                          borderRadius: '6px',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 400,
                          minWidth: '32px',
                          minHeight: '32px',
                          boxShadow: 'none',
                        }}
                    >
                      {t('UserProfile.Button.Edit')}
                    </Button>
                ) : (
                    <Stack direction="row" spacing={2}>
                      <Button
                          startIcon={<FaTimes/>}
                          variant="outlined"
                          onClick={() => setEditMode(false)}
                          sx={{
                            backgroundColor: '#CECECE',
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: '6px',
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            fontWeight: 400,
                            minWidth: '32px',
                            minHeight: '32px',
                            boxShadow: 'none',
                          }}
                      >
                        {t('UserProfile.Button.Cancel')}
                      </Button>
                      <Button
                          startIcon={<FaSave/>}
                          variant="contained"
                          onClick={handleProfileUpdate}
                          sx={{
                            backgroundColor: '#1677FF',
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: '6px',
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            fontWeight: 400,
                            minWidth: '32px',
                            minHeight: '32px',
                            boxShadow: 'none',
                          }}
                      >
                        {t('UserProfile.Button.Save')}
                      </Button>
                    </Stack>
                )}
              </Grid>

              {Object.entries(userData).map(([key, value]) => {
                if (key !== 'id' && key !== 'avatar' && key !== 'fullName' && key !== 'enabled') {
                  return (
                      <Grid item xs={12} sm={6} key={key} sx={{ maxWidth: 300 }}>
                        <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            disabled={!editMode ||
                                (key !== 'firstName' && key !== 'lastName')}
                            onChange={(e) =>
                                key === 'firstName' || key === 'lastName'
                                    ?
                                    setUserData(
                                        {...userData, [key]: e.target.value})
                                    :
                                    null
                            }
                        />
                      </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </Paper>
        </Box>
      </Box>
  );
};

export default UserProfile;