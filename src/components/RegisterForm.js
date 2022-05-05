import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import {LogoButton} from './LogoTextButton';

const RegisterForm = ({setToggle}) => {
  const alkuarvot = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  };

  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    confirm: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['minStringLength: 3'],
  };

  const errorMessages = {
    username: [
      'required field',
      'minimun 3 character',
      'user name not available',
    ],
    password: ['required field', 'minimun 5 character'],
    confirm: ['password do not mach'],
    email: ['required field', 'email is not valid'],
    full_name: ['minimun 3 character'],
  };

  const {postUser, getUsername} = useUser();

  const doRegister = async () => {
    console.log('doRegister');
    try {
      delete inputs.confirm;
      const userData = await postUser(inputs);
      userData && setToggle(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    alkuarvot
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      try {
        return await getUsername(value);
      } catch (err) {
        return true;
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== inputs.password) {
        return false;
      }
      return true;
      // return value === inputs.password ? true : false;
    });

    return () => {
      ValidatorForm.addValidationRule('isAvailable'); // optional
    };
  }, [inputs]);

  return (
    <Grid container justifyContent="center">
      <LogoButton />
      <Grid textAlign="center" item xs={12}>
        <Typography component="h5" variant="h5" mt={1}>
          Register
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
            validators={validators.full_name}
            errorMessages={errorMessages.full_name}
          />
          <Button
            fullWidth
            sx={{mt: 2, mb: 2}}
            color="primary"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </ValidatorForm>
      </Grid>
      <Grid textAlign="center" item xs={10} sx={{mb: 2}}>
        <Typography variant="subtitle1">Already an account?</Typography>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
