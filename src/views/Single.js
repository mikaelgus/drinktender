import {Link, useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import {safeParseJson} from '../utils/functions';
import {BackButton} from '../components/BackButton';
import {EditOutlined, StarBorder} from '@mui/icons-material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const Single = () => {
  const {user} = useContext(MediaContext);
  const location = useLocation();
  console.log(location);
  const file = location.state.file;
  const {description, instructions, filters} = safeParseJson(
    file.description
  ) || {
    description: file.description,
    instructions: {},
    filters: {},
  };
  console.log('from singlem description', instructions);
  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <Card sx={{width: '80vw'}}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor: '#BDA243'}} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              user &&
              user.user_id == file.user_id && (
                <IconButton component={Link} to={'/modify'} state={{file}}>
                  <EditOutlined />
                </IconButton>
              )
            }
            titleTypographyProps={{variant: 'h6'}}
            title={file.title}
          />
          <CardMedia
            component={file.media_type === 'image' ? 'img' : file.media_type}
            controls={true}
            poster={mediaUrl + file.screenshot}
            src={mediaUrl + file.thumbnails.w320}
            alt={file.title}
            sx={{
              height: '15vh',
              width: '100%',
              filter: `brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturate}%)
          sepia(${filters.sepia}%)`,
            }}
          />
          <CardContent sx={{background: '#f9f9f9'}}>
            <Typography variant="h6" mb={1}>
              Ingredients:
            </Typography>
            <Typography variant="body1" mb={2}>
              {description}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" mb={1}>
              Preparation:
            </Typography>
            <Typography variant="body1" mb={2}>
              {instructions}
            </Typography>
          </CardContent>

          <CardContent sx={{background: '#f9f9f9'}}>
            <Typography variant="h6" mb={1}>
              tags:
            </Typography>
            <Typography variant="body1" mb={2}>
              jotain, vielä, ehkä, tai, kai
            </Typography>
          </CardContent>
        </Card>

        {user && (
          <Card sx={{marginTop: '1rem', width: '80vw'}}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Review:
              </Typography>
              <Typography variant="body1" mb={2}>
                <StarBorder />
                <StarBorder />
                <StarBorder />
                <StarBorder />
                <StarBorder />
              </Typography>
            </CardContent>
          </Card>
        )}

        <Card sx={{marginTop: '1rem', width: '80vw'}}>
          <CardContent sx={{background: '#f9f9f9'}}>
            <Typography variant="h6" mb={1}>
              Comments:
            </Typography>
            <Typography variant="body1" mb={2}>
              kovasti kommentointia
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
