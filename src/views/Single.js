import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import useForm from '../hooks/FormHooks';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  TextareaAutosize,
  Grid,
  Button,
  CardHeader,
  IconButton,
} from '@mui/material';
import {safeParseJson} from '../utils/functions';
import {BackButton} from '../components/BackButton';
import {useContext, useEffect, useState} from 'react';
import {useComment, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import Comments from '../components/Comments';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {EditOutlined, LocalBar, StarBorder} from '@mui/icons-material';

const Single = () => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });

  const alkuarvot = {
    comment: '',
  };

  const location = useLocation();
  const file = location.state.file;
  const {description, instructions, filters} = safeParseJson(
    file.description
  ) || {
    description: file.description,
    instructions: {},
    filters: {},
  };

  const {getTag} = useTag();
  const {postComment} = useComment();

  const fetchAvatar = async () => {
    try {
      if (file) {
        const avatars = await getTag('avatar_' + file.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
        // hae käyttäjä apihooksista
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const doComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = {file_id: file.file_id, comment: inputs.comment};
      const commentData = await postComment(data, token);
      if (commentData) {
        // Kommentti listan päivitys
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doComment,
    alkuarvot
  );

  useEffect(() => {
    fetchAvatar();
  }, [inputs.file]);

  const filled = inputs.comment != '';

  // console.log(inputs);

  return (
    <>
      <BackButton />
      <Card sx={{width: '80vw'}}>
        <CardHeader
          avatar={
            <Avatar sx={{bgcolor: '#BDA243'}} aria-label="recipe">
              <LocalBar />
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
          <Typography variant="body1" mb={2} sx={{whiteSpace: 'pre-line'}}>
            {description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6" mb={1}>
            Instructions:
          </Typography>
          <Typography variant="body1" mb={2} sx={{whiteSpace: 'pre-line'}}>
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

      <Grid container>
        <Typography variant="h3" className="comments-title">
          Comments
        </Typography>
        <Grid item xs={12}>
          {user && (
            <>
              <ValidatorForm onSubmit={handleSubmit}>
                <TextareaAutosize
                  style={{width: '100%'}}
                  minRows={3}
                  placeholder="Add a comment"
                  label="comment area"
                  name="comment"
                  onChange={handleInputChange}
                  value={inputs.comment}
                />
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={!filled}
                >
                  Submit
                </Button>
              </ValidatorForm>
            </>
          )}
        </Grid>
        <Comments file={file} />
      </Grid>
    </>
  );
};
Single.propTypes = {
  setToggle: PropTypes.func,
};

// TODO in the next task: add propType for location

export default Single;
