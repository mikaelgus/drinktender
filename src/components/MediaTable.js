import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useFavourite, useMedia, useTag} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true, favouriteFiles = false, tags = null}) => {
  const {user} = useContext(MediaContext);
  const [favouriteArray, setFavouriteArray] = useState([]);
  const [filteredTagArray, setFilteredTagArray] = useState([]);
  const {mediaArray, loading, deleteMedia} = useMedia(allFiles, user?.user_id);
  const token = localStorage.getItem('token');

  const windowSize = useWindowSize();
  const {getFavourite} = useFavourite();
  const {searchWithTags} = useTag();

  const listFiltered = async () => {
    tags = ['Alcohol', 'Non-alcoholic'];
    console.log(tags);
    try {
      const searchData = await searchWithTags(tags);
      console.log(searchData);
      // setMediaArray(searchData);
    } catch (error) {
      console.error(error.message);
    }
    return mediaArray;
  };

  const listFavourites = async () => {
    try {
      const favouriteResult = await getFavourite(token);
      console.log('favourite list', favouriteResult);
      console.log('media array', mediaArray);
      const filteredArray = mediaArray.filter((media) => {
        return favouriteResult.filter((favourite) => {
          return media.file_id == favourite.file_id;
        })[0];
      });
      console.log(filteredArray);
      setFavouriteArray(filteredArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    listFiltered();
    favouriteFiles && listFavourites();
  }, [favouriteFiles, mediaArray]);

  console.log('favourite files true or false: ', favouriteFiles);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          variant="masonry"
          cols={windowSize.width > 768 ? 3 : 2}
          gap={8}
        >
          {!favouriteFiles &&
            mediaArray.map((item, index) => {
              return (
                <MediaRow
                  key={index}
                  file={item}
                  userId={user ? user.user_id : null}
                  deleteMedia={deleteMedia}
                />
              );
            })}
          {favouriteFiles &&
            favouriteArray.map((item, index) => {
              return (
                <MediaRow
                  key={index}
                  file={item}
                  userId={user ? user.user_id : null}
                  deleteMedia={deleteMedia}
                />
              );
            })}
          {tags !== null &&
            filteredTagArray.map((item, index) => {
              return (
                <MediaRow
                  key={index}
                  file={item}
                  userId={user ? user.user_id : null}
                  deleteMedia={deleteMedia}
                />
              );
            })}
        </ImageList>
      )}
    </>
  );
};

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
  favouriteFiles: PropTypes.bool,
};

export default MediaTable;
