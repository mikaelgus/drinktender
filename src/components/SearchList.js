import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SearchList = ({file}) => {
  return (
    <List key={file.file_id} component={Link} to={'/single'} state={{file}}>
      <ListItem key={file.file_id} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={file.title} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
SearchList.propTypes = {
  file: PropTypes.object,
};

export default SearchList;
