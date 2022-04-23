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
      <Typography component="h3" variant="h4" display="inline" color="#3A9FB5">
        Drink
      </Typography>
      <Typography component="h3" variant="h4" display="inline" color="#BDA243">
        tender
      </Typography>
    </Link>
  );
};

export {LogoButton};
