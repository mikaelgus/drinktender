import {ListItem, ListItemButton, ListItemText} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SearchList = ({file}) => {
  return (
    <ListItem key={file.file_id} component="div" disablePadding>
      <ListItemButton component={Link} to={'/single'} state={{file}}>
        <ListItemText primary={file.title} />
      </ListItemButton>
    </ListItem>
  );
};
SearchList.propTypes = {
  file: PropTypes.object,
};

export default SearchList;
