import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  AccountCircle,
  Badge,
  ContactMail,
  EditOutlined,
  PersonOutline,
} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {LogoButton} from '../components/LogoTextButton';

const Profile = () => {
  const {user} = useContext(MediaContext);

  return (
    <>
      <Grid container justifyContent="center">
        <LogoButton />
        <Grid textAlign="center" item xs={10}>
          <Typography component="h5" variant="h5" mt={1} mb={2}>
            Profile
          </Typography>
        </Grid>

        {user && (
          <Card sx={{width: '80vw'}}>
            <CardHeader
              avatar={
                <Avatar sx={{bgcolor: '#BDA243'}} aria-label="recipe">
                  <PersonOutline />
                </Avatar>
              }
              action={
                user && (
                  <IconButton component={Link} to={'/editprofile'}>
                    <EditOutlined />
                  </IconButton>
                )
              }
            />
            <CardContent>
              <List>
                <ListItem sx={{background: '#f9f9f9'}}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={user.username} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ContactMail />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem sx={{background: '#f9f9f9'}}>
                  <ListItemIcon>
                    <Badge />
                  </ListItemIcon>
                  <ListItemText primary={user.full_name} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}
      </Grid>
    </>
  );
};

export default Profile;
