import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useFavourite, useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true, favouriteFiles = false}) => {
  const {user} = useContext(MediaContext);
  const {mediaArray, loading, deleteMedia} = useMedia(allFiles, user?.user_id);
  const windowSize = useWindowSize();
  const {getFavourite} = useFavourite();

  const listFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const favouriteResult = await getFavourite(token);
      console.log('favourite list', favouriteResult);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    favouriteFiles && listFavourites();
  }, [favouriteFiles]);

  console.log('favourite files', favouriteFiles);

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
          {mediaArray.map((item, index) => {
            // console.log(item.file_id);
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
