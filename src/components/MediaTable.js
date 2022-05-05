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
  const {mediaArray, loading, deleteMedia, getFile} = useMedia(
    allFiles,
    user?.user_id
  );
  const token = localStorage.getItem('token');

  const windowSize = useWindowSize();
  const {getFavourite} = useFavourite();
  const {searchWithTags} = useTag();

  const listFiltered = async () => {
    const results = [];
    try {
      const searchData = await searchWithTags(tags);
      console.log(searchData);
      for (let n = 0; n < searchData.length; n++) {
        console.log(searchData[n]);
        const temp = await getFile(searchData[n]);
        results.push(temp);
      }
      setFilteredTagArray(results);
    } catch (error) {
      // console.error(error.message);
    }
  };

  const listFavourites = async () => {
    try {
      const favouriteResult = await getFavourite(token);
      const filteredArray = mediaArray.filter((media) => {
        return favouriteResult.filter((favourite) => {
          return media.file_id === favourite.file_id;
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
  }, [favouriteFiles, mediaArray, tags]);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          cols={windowSize.width > 768 ? 3 : 2}
          gap={8}
          sx={{marginBottom: '5rem'}}
        >
          {favouriteFiles
            ? favouriteArray.map((item, index) => {
                return (
                  <MediaRow
                    key={index}
                    file={item}
                    userId={user ? user.user_id : null}
                    deleteMedia={deleteMedia}
                  />
                );
              })
            : tags !== null && !favouriteFiles
            ? filteredTagArray.map((item, index) => {
                return (
                  <MediaRow
                    key={index}
                    file={item}
                    userId={user ? user.user_id : null}
                    deleteMedia={deleteMedia}
                  />
                );
              })
            : mediaArray.map((item, index) => {
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
  tags: PropTypes.any,
};

export default MediaTable;
