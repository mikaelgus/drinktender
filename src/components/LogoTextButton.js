import {Link, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const LogoButton = () => {
  const navigate = useNavigate();
  return (
    <Link
      component="button"
      underline="none"
      onClick={() => {
        navigate('/home');
      }}
    >
      <Typography component="h4" variant="h4" display="inline" color="primary">
        Drink
      </Typography>
      <Typography
        component="h3"
        variant="h3"
        display="inline"
        color="secondary"
      >
        tender
      </Typography>
    </Link>
  );
};

export {LogoButton};
