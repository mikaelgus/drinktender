import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const CancelButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{textDecoration: 'underline'}}
      mt={1}
      mb={2}
      onClick={() => {
        navigate(-1);
      }}
    >
      Cancel
    </Button>
  );
};

export {CancelButton};
