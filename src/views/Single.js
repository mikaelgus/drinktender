import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import useForm from '../hooks/FormHooks';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  TextareaAutosize,
  Grid,
  Button,
} from '@mui/material';
import {safeParseJson} from '../utils/functions';
import {BackButton} from '../components/BackButton';
import {useContext, useEffect, useState} from 'react';
import {useComment, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import Comments from '../components/Comments';
import {ValidatorForm} from 'react-material-ui-form-validator';

const Single = () => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });

  const alkuarvot = {
    comment: '',
  };

  const location = useLocation();
  const file = location.state.file;
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
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
      <Typography component="h1" variant="h2">
        {file.title} <BackButton />
      </Typography>
      <Card>
        <CardMedia
          component={file.media_type === 'image' ? 'img' : file.media_type}
          controls={true}
          poster={mediaUrl + file.screenshot}
          src={mediaUrl + file.filename}
          alt={file.title}
          sx={{
            height: '60vh',
            filter: `brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturate}%)
          sepia(${filters.sepia}%)`,
          }}
        />
        <CardContent>
          <Typography>{description}</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={avatar.filename} />
              </ListItemAvatar>
              <Typography variant="subtitle2">
                Käyttäjä: {file.user_id}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Typography variant="h3" className="comments-title">
        Comments
      </Typography>
      <Grid container>
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
