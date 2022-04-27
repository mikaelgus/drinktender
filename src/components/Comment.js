import PropTypes from 'prop-types';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const Comment = ({file, userId, deleteComment}) => {
  const {update, setUpdate} = useContext(MediaContext);

  // eslint-disable-next-line no-unused-vars
  const doDelete = async () => {
    const ok = confirm('Do you want to delete this comment?');
    if (ok) {
      try {
        const token = localStorage.getItem('token');
        const data = file.comment_id;
        const deleteInfo = await deleteComment(data, token);
        if (deleteInfo) {
          setUpdate(!update);
        }
      } catch (err) {
        console.log('comment doDelete: ', err);
      }
    }
  };

  // console.log(file.comment_id);
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem key={file.file_id}>
            <ListItemText
              primary={`Käyttäjä: ${file.user_id}`}
              secondary={<Typography>{file.comment}</Typography>}
            ></ListItemText>
            {userId == file.user_id && (
              <>
                <IconButton variant="contained" onClick={doDelete}>
                  Delete
                </IconButton>
              </>
            )}
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
