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
          <Typography component="subtitle1" variant="subtitle1" mt={1} mb={2}>
            Updated May 1, 2022
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
                <Typography component="subtitle1" variant="subtitle1">
                  1 Introduction
                </Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography component="subtitle1" variant="subtitle1">
                  This Drinktender Privacy Policy applies to information which
                  identifies you, or from which you can reasonably be
                  identified, such as your full name and email address. This
                  Policy describes how we handle the personal information we
                  collect. We handle the information we collect in the course of
                  journalism in accordance with the the Finnish Personal Data
                  Act.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  2 What information do we collect
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  We collect personal information to provide Company Services
                  and for our business operations. If you choose not to provide
                  the information we request from you, we may not be able to
                  provide you with the services you require. We describe the
                  main types of personal information we collect and the main
                  reasons why we collect that information below. Registration
                  Information is the information you provide to Company when you
                  register for or acquire a Company Service. This may include
                  information you provide us to: create an account, post
                  recipes, post comments and give a grade. Registration
                  Information includes: username, email address and your full
                  name.
                </Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography component="subtitle1" variant="subtitle1">
                  3 How do we use your information
                </Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography component="subtitle1" variant="subtitle1">
                  We use the information to ensure that you are an authorized
                  person to create a post, provide reviews and comments. We do
                  not distribute newsletters or provide information to any third
                  party.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  4 How do we protect your information
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  We use reasonable measures to safeguard the personal
                  information we hold about you from loss, theft and
                  unauthorised use, disclosure or modification, including:
                  system security and property security.
                </Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography component="subtitle1" variant="subtitle1">
                  5 How you can access your information
                </Typography>
              </ListItem>
              <ListItem sx={{background: '#f9f9f9'}}>
                <Typography component="subtitle1" variant="subtitle1">
                  If you would like to access, review, correct or update your
                  personal information, you can do that only by logging in to
                  the app and going to the profile view.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  6 How you can contact us
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="subtitle1" variant="subtitle1">
                  You can not.
                </Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PrivacyPolicy;
