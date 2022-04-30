import {Button, Grid, TextField, Typography, Link} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useLogin} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {LogoButton} from './LogoTextButton';

const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser} = useContext(MediaContext);
  const alkuarvot = {
    username: '',
    password: '',
  };

  const {postLogin} = useLogin();
  const navigate = useNavigate();

  const doLogin = async () => {
    console.log('doLogin');
    try {
      const userData = await postLogin(inputs);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, alkuarvot);
  console.log(inputs);
  return (
    <Grid container justifyContent="center">
      <LogoButton />
      <Grid textAlign="center" item xs={10}>
        <Typography component="h5" variant="h5" mt={1}>
          Login
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            label="username"
            placeholder="username"
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
          />
          <TextField
            fullWidth
            margin="normal"
            size="small"
            label="password"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <Button
            sx={{mt: 2, mb: 2}}
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid textAlign="center" item xs={10}>
        <Typography component="subtitle1" variant="subtitle1">
          Need an account?
        </Typography>
      </Grid>
      <Grid container justifyContent="center" sx={{mb: 2}}>
        <Link
          component="button"
          onClick={() => {
            navigate('/policy');
          }}
        >
          <Typography mt={1}>Read privacy policy</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
