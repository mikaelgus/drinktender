import {Button, Grid} from '@mui/material';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
      <Grid container justifyContent="center" mb={11}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? 'register' : 'login'}
        </Button>
      </Grid>
    </>
  );
};

export default Login;
