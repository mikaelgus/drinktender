import {Button, Grid, Typography} from '@mui/material';
import {useContext, useEffect} from 'react';
import {TextValidator} from 'react-material-ui-form-validator';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';
import {BackButton} from '../components/BackButton';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';

const EditProfile = () => {
  const {user} = useContext(MediaContext);

  const alkuarvot = {
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    password: '',
    confirm: '',
  };
  console.log('alkuarvot', alkuarvot);

  const validators = {
    username: ['required', 'minStringLength: 3'],
    email: ['required', 'isEmail'],

    password: ['minStringLength: 5'],
    confirm: ['isPasswordMatch'],
  };

  const errorMessages = {
    username: ['required field', 'minimun 3 character'],
    email: ['required field', 'email is not valid'],

    password: ['minimun 5 character'],
    confirm: ['password do not mach'],
  };

  const {putUser} = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const doProfile = async () => {
    console.log('doProfile inputs', inputs);
    try {
      delete inputs.confirm;
      const userData = await putUser(inputs, token);
      confirm(userData.message) && navigate('/profile');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doProfile,
    alkuarvot
  );

  console.log('inputs: ', inputs);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });
  }, [inputs]);

  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <Grid textAlign="center" item xs={10}>
          <Typography component="h5" variant="h5" mt={1}>
            Edit your profile
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              placeholder="username"
              label="username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              validators={validators.username}
              errorMessages={errorMessages.username}
            />
            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              label="email"
              placeholder="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={inputs.email}
              validators={validators.email}
              errorMessages={errorMessages.email}
            />
            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              label="full name"
              placeholder="full name"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
            />
            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              label="password"
              placeholder="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
              validators={validators.password}
              errorMessages={errorMessages.password}
            />
            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              label="re-type password"
              placeholder="re-type password"
              name="confirm"
              type="password"
              onChange={handleInputChange}
              value={inputs.confirm}
              validators={validators.confirm}
              errorMessages={errorMessages.confirm}
            />
            <Button
              fullWidth
              sx={{mt: 2, mb: 2}}
              color="primary"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </ValidatorForm>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
