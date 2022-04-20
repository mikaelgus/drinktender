import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Logout = () => {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser} = useContext(MediaContext);
  localStorage.clear();
  setUser(null);
  return <>{!user ? <Navigate to="/" /> : <div>Closing...</div>}</>;
};

export default Logout;
