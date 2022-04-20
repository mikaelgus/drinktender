import {Button} from '@mui/material';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
      OR
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? 'register' : 'login'}
      </Button>
    </>
  );
};

export default Login;
