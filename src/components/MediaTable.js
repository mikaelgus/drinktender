import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useFavourite, useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true, favouriteFiles = false}) => {
  const {user} = useContext(MediaContext);
  const [favouriteArray, setFavouriteArray] = useState([]);
  const {mediaArray, loading, deleteMedia} = useMedia(allFiles, user?.user_id);

  const windowSize = useWindowSize();
  const {getFavourite} = useFavourite();

  const listFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const favouriteResult = await getFavourite(token);
      // console.log('favourite list', favouriteResult);
      // console.log('media array', mediaArray);
      const filteredArray = mediaArray.filter((media) => {
        return favouriteResult.filter((favourite) => {
          return media.file_id == favourite.file_id;
        })[0];
      });
      // console.log(filteredArray);
      setFavouriteArray(filteredArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    favouriteFiles && listFavourites();
  }, [favouriteFiles, mediaArray]);

  // console.log('favourite files true or false: ', favouriteFiles);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          variant="masonry"
          cols={windowSize.width > 768 ? 3 : 2}
          gap={8}
          sx={{marginBottom: '5rem'}}
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
