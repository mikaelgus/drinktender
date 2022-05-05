import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import {appID, mediaUrl} from '../utils/variables';
import useForm from '../hooks/FormHooks';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Grid,
  Button,
  CardHeader,
  IconButton,
  Rating,
  ToggleButton,
} from '@mui/material';
import {safeParseJson} from '../utils/functions';
import {BackButton} from '../components/BackButton';
import {useContext, useEffect, useState} from 'react';
import {useComment, useRating, useTag} from '../hooks/ApiHooks';
import {useFavourite} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import Comments from '../components/Comments';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {
  CheckCircleOutlineRounded,
  EditOutlined,
  LocalBar,
} from '@mui/icons-material';
import {TextValidator} from 'react-material-ui-form-validator';
import BottomNav from '../components/BottomNav';

const Single = () => {
  const [trueTags, setTrueTags] = useState([]);
  const {user, update, setUpdate} = useContext(MediaContext);
  const [ratings, setRatings] = useState(0);
  const [userRating, setUserRating] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState();

  const alkuarvot = {
    comment: '',
  };

  const location = useLocation();
  // console.log('single location', location);
  const file = location.state.file;
  const {description, instructions, filters} = safeParseJson(
    file.description
  ) || {
    description: file.description,
    instructions: {},
    filters: {},
  };

  const {postComment} = useComment();
  const {getRating, postRating} = useRating();
  const actualTags = [];
  const {postFavourite, getSingleFavourite, deleteFavourite} = useFavourite();

  const doComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = {file_id: file.file_id, comment: inputs.comment};
      const commentData = await postComment(data, token);
      if (commentData) {
        // Kommentti listan pÃ¤ivitys
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTagsOfFile = async () => {
    const tags = await useTag().getTagsOfFile(file.file_id);
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].tag !== appID) {
        const temp = tags[i].tag.slice(0, -appID.length);
        actualTags.push(temp);
      }
    }
    setTrueTags(actualTags);
  };

  const fetchUserRating = async () => {
    try {
      const ratingsData = await getRating(file.file_id);

      ratingsData.forEach((rating) => {
        setUserRating(rating.rating);
      });

      const summa = ratingsData.reduce((nro, rating) => {
        return nro + rating.rating;
      }, 0);
      const ka = summa / ratingsData.length;
      setRatings(ka);
    } catch (err) {
      console.log('fetchRating error ', err);
    }
  };
  // console.log(ratings); // Keskiarvo

  const doRating = async (event, newValue) => {
    setUserRating(newValue);
    try {
      const token = localStorage.getItem('token');
      const data = {file_id: file.file_id, rating: newValue};
      const ratingData = await postRating(data, token);
      if (ratingData) {
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
    fetchUserRating();
  }, [inputs.file, user, update]);

  useEffect(async () => {
    getTagsOfFile();
  }, []);

  const filled = inputs.comment != '';

  // console.log(file);

  const isFavourite = async () => {
    try {
      const result = await getSingleFavourite(file.file_id);
      if (result) {
        console.log('is favourite', result);
        if (result.length == 0) {
          console.log('this recipe is not your favourite');
        } else {
          console.log('this recipe is added to your favourites');

          setSelected(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user && isFavourite();
  }, [inputs.file, user, update]);

  // eslint-disable-next-line no-unused-vars
  const doFavourite = async () => {
    console.log('doFavourite');
    try {
      const token = localStorage.getItem('token');
      const data = {file_id: file.file_id};
      const addFavourite = await postFavourite(data, token);
      if (addFavourite) {
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const delFavourite = () => {
    try {
      const token = localStorage.getItem('token');
      const data = file.file_id;

      const removeFavourite = deleteFavourite(data, token);
      if (removeFavourite) {
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addFav = () => {
    console.log('added to favourites');
  };
  const delFav = () => {
    console.log('deleted from favourites');
  };

  // const logged = user

  return (
    <>
      <BackButton />
      <Grid container justifyContent="center" mb={7}>
        <Card sx={{width: '95vw'}}>
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
              width: '50%',
              margin: 'auto',
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
              Tags:
            </Typography>
            <Typography variant="body1" ml={2}>
              {trueTags?.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </Typography>
          </CardContent>
        </Card>

        {user && (
          <Card sx={{marginTop: '1rem', width: '95vw'}}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Rating: {ratings}
              </Typography>
              <Typography variant="body1" mb={2}>
                <Rating value={userRating} onChange={doRating} />
              </Typography>
              <ToggleButton
                size="small"
                color="secondary"
                value="check"
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                  if (selected) {
                    delFav();
                    delFavourite();
                  }
                  if (!selected) {
                    addFav();
                    doFavourite();
                  }
                }}
              >
                {selected ? 'In favourites ' : 'Add to favourites '}
                <CheckCircleOutlineRounded />
              </ToggleButton>
            </CardContent>
          </Card>
        )}

        <Card sx={{marginTop: '1rem', width: '95vw', marginBottom: '2rem'}}>
          <CardContent>
            <Typography variant="h6" className="comments-title" mt={1}>
              Comments:
            </Typography>
            <Grid item xs={12}>
              {user && (
                <>
                  <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator
                      multiline
                      fullWidth
                      margin="normal"
                      placeholder="Add a comment"
                      label="Add a comment"
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
          </CardContent>
        </Card>
      </Grid>
      <BottomNav />
    </>
  );
};
Single.propTypes = {
  setToggle: PropTypes.func,
};

export default Single;
