import {DeleteForeverOutlined} from '@mui/icons-material';
import {IconButton, ImageListItem, ImageListItemBar} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';

const MediaRow = ({file, userId, deleteMedia}) => {
  const {filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {},
  };

  const {update, setUpdate} = useContext(MediaContext);
  const navigate = useNavigate();

  const doDelete = () => {
    const ok = confirm('Are you sure you want delete your post?');
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
      navigate('/home');
    }
  };

  return (
    <ImageListItem
      key={file.file_id}
      component={Link}
      to={'/single'}
      state={{file}}
    >
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
      {userId == file.user_id && (
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to left, rgba(0,0,0,0.5) 0%, ' +
              'rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          }}
          position="top"
          actionIcon={
            <IconButton color="edit" onClick={doDelete}>
              <DeleteForeverOutlined />
            </IconButton>
          }
        />
      )}
      <ImageListItemBar
        position="below"
        actionIcon={
          <IconButton sx={{fontSize: '0.8rem'}} color="postname">
            {file.title}
          </IconButton>
        }
        actionPosition="left"
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
