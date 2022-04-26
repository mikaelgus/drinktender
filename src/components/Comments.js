import {CircularProgress, List} from '@mui/material';
import PropTypes from 'prop-types';
import {useWindowSize} from '../hooks/WindowHooks';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useComment} from '../hooks/ApiHooks';
import Comment from './Comment';

const Comments = ({file}, {allComments = true}) => {
  const {user} = useContext(MediaContext);
  const [postComments, setPostComments] = useState([]);

  const {getComment} = useComment();
  const windowSize = useWindowSize();
  const {loading, deleteComment} = useComment(allComments, user?.user_id);

  const fetchComment = async () => {
    try {
      const comments = await getComment(file.file_id);
      setPostComments(comments);
    } catch (err) {
      console.log('fetchComment error', err);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <List variant="masonry" cols={windowSize.width > 768 ? 3 : 2} gap={8}>
          {postComments.map((item, index) => {
            return (
              <Comment
                key={index}
                file={item}
                userId={user ? user.user_id : null}
                deleteComment={deleteComment}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

Comments.propTypes = {
  allComments: PropTypes.bool,
  file: PropTypes.object,
};
export default Comments;
