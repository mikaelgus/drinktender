import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      style={{
        position: 'absolute',
        bottom: 0,
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 80,
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<AccountCircle />} component={Link} to="/home" />
      <BottomNavigationAction label="Upload" icon={<AccountCircle />} component={Link} to="/upload" />
      <BottomNavigationAction label="Profile" icon={<AccountCircle />} component={Link} to="/profile" />
    </BottomNavigation>
  );
};

export default BottomNav;
