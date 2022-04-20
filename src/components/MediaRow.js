import {Button, ImageListItem, ImageListItemBar} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';

const MediaRow = ({file, userId, deleteMedia}) => {
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {},
  };

  const {update, setUpdate} = useContext(MediaContext);
  const doDelete = () => {
    const ok = confirm('Do juu delte?');
    if (ok) {
      try {
        const deleteInfo = deleteMedia(
          file.file_id,
          localStorage.getItem('token')
        );
        if (deleteInfo) {
          setUpdate(!update);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };

  console.log('inside dsc', description);
  console.log(filters);
  return (
    <ImageListItem key={file.file_id}>
      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'}
        alt={file.title}
        loading="lazy"
        style={{
          filter: `brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturate}%)
        sepia(${filters.sepia}%)`,
        }}
      />
      <ImageListItemBar
        actionIcon={
          <>
            <Button
              variant="contained"
              component={Link}
              to={'/single'}
              state={{file}}
            >
              View
            </Button>
            {userId == file.user_id && (
              <>
                <Button
                  variant="contained"
                  component={Link}
                  to={'/modify'}
                  state={{file}}
                >
                  Edit
                </Button>
                <Button variant="contained" onClick={doDelete}>
                  Delete
                </Button>
              </>
            )}
          </>
        }
        title={file.title}
        subtitle={description}
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
};

export default MediaRow;
