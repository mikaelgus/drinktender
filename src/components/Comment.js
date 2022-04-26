import PropTypes from 'prop-types';
import {Grid, List, ListItem, ListItemText, Typography} from '@mui/material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const Comment = ({file, userId, deleteComment}) => {
  const {update, setUpdate} = useContext(MediaContext);

  // eslint-disable-next-line no-unused-vars
  const doDelete = () => {
    const confirm = confirm('Do you want to delete this comment?');
    if (confirm) {
      try {
        const deleteInfo = deleteComment(
          file.file_id,
          localStorage.getItem('token')
        );
        if (deleteInfo) {
          setUpdate(!update);
        }
      } catch (err) {
        console.log('comment delete error', err);
      }
    }
  };
  // console.log(file);
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem key={file.file_id} state={{file}}>
            <ListItemText
              primary={file.user_id}
              secondary={<Typography>{file.comment}</Typography>}
            ></ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
Comment.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteComment: PropTypes.func,
};

export default Comment;
