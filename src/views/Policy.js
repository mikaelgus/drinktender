import {PolicyOutlined} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import {BackButton} from '../components/BackButton';
import {LogoButton} from '../components/LogoTextButton';

const PrivacyPolicy = () => {
  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <LogoButton />
        <Grid textAlign="center" item xs={10}>
          <Typography component="h5" variant="h5" mt={1} mb={2}>
            Privacy policy
          </Typography>
        </Grid>
        <Card sx={{width: '80vw'}}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor: '#BDA243'}} aria-label="recipe">
                <PolicyOutlined />
              </Avatar>
            }
          />
          <CardContent>
            <List>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography>Privacy text 1</Typography>
              </ListItem>
              <ListItem>
                <Typography>Privacy text 2</Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography>Privacy text 3</Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PrivacyPolicy;
