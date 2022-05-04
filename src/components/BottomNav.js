import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {AccountCircle, Home, Upload} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const BottomNav = () => {
  const [view, setView] = useState(0);
  const [mobile, setMobile] = useState(false);
  const getWidth = () => {
    console.log('Width: ' + window.innerWidth);
    if (window.innerWidth > 1450) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  };

  useEffect(() => {
    getWidth();
  }, []);

  return (
    <>
      {mobile && (
        <BottomNavigation
          style={{
            position: 'fixed',
            bottom: 0,
            paddingTop: 2,
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: 80,
          }}
          showLabels
          value={view}
          onChange={(event, newValue) => {
            console.log(newValue);
            setView(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            component={Link}
            to="/home"
          />
          <BottomNavigationAction
            label="Upload"
            icon={<Upload />}
            component={Link}
            to="/upload"
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircle />}
            component={Link}
            to="/profile"
          />
        </BottomNavigation>
      )}
    </>
  );
};

export default BottomNav;
