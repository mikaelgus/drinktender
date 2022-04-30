import {
  Button,
  CircularProgress,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useLocation, useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';

import {ValidatorForm} from 'react-material-ui-form-validator';
import {TextValidator} from 'react-material-ui-form-validator';
import {BackButton} from '../components/BackButton';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';
import {Add, Remove} from '@mui/icons-material';

const Modify = () => {
  const location = useLocation();
  const file = location.state.file;

  const {description, instructions, filters} = safeParseJson(
    file.description
  ) || {
    description: file.description,
    instructions: {},
    filters: {},
  };

  console.log('modify file', file);

  const alkuarvot = {
    title: file.title,
    description: description,
    instructions: instructions,
  };
  console.log('alkuarvot', alkuarvot);
  const validators = {
    title: ['required', 'minStringLength: 2'],
    description: ['minStringLength: 2'],
  };

  const errorMessages = {
    title: ['required field', 'minimun 2 character'],
    description: ['minimun 2 character'],
  };

  const {putMedia, loading} = useMedia();
  const navigate = useNavigate();

  const doModify = async () => {
    try {
      console.log('doModify');
      const desc = {
        description: inputs.description,
        instructions: inputs.instructions,
        filters: filterInputs,
      };
      // objekti lähetettäväksi
      const data = {
        title: inputs.title,
        description: JSON.stringify(desc),
      };

      console.log(desc);
      const token = localStorage.getItem('token');
      const mediaData = await putMedia(file.file_id, data, token);

      confirm(mediaData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModify,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filters
  );

  console.log(inputs, filterInputs);

  // upload button hidden if no tittle and file
  const allFilled = (inputs.title != '') & (inputs.file != undefined);

  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <Grid textAlign="center" item xs={10}>
          <Typography component="h5" variant="h5" mt={1} mb={2}>
            Modify your post
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <ValidatorForm onSubmit={handleSubmit}>
            {file && (
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    {' '}
                    <img
                      style={{
                        width: '50%',
                        filter: `brightness(${filterInputs.brightness}%)
                      contrast(${filterInputs.contrast}%)
                      saturate(${filterInputs.saturate}%)
                      sepia(${filterInputs.sepia}%)`,
                      }}
                      src={mediaUrl + file.filename}
                      alt="preview"
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs={10}>
                    <Typography variant="subtitle2">brightness</Typography>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{mb: 1}}
                      alignItems="center"
                    >
                      <Remove />
                      <Slider
                        name="brightness"
                        min={0}
                        max={200}
                        step={1}
                        onChange={handleSliderChange}
                        value={filterInputs.brightness}
                      />
                      <Add />
                    </Stack>
                  </Grid>
                </Grid>

                <Grid item xs={10}>
                  <Typography variant="subtitle2">contrast</Typography>
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{mb: 1}}
                    alignItems="center"
                  >
                    <Remove />
                    <Slider
                      name="contrast"
                      min={0}
                      max={200}
                      step={1}
                      onChange={handleSliderChange}
                      value={filterInputs.contrast}
                    />
                    <Add />
                  </Stack>
                </Grid>

                <Grid item xs={10}>
                  <Typography variant="subtitle2">saturate</Typography>
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{mb: 1}}
                    alignItems="center"
                  >
                    <Remove />
                    <Slider
                      name="saturate"
                      min={0}
                      max={200}
                      step={1}
                      onChange={handleSliderChange}
                      value={filterInputs.saturate}
                    />
                    <Add />
                  </Stack>
                </Grid>

                <Grid item xs={10}>
                  <Typography variant="subtitle2">sepia</Typography>
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{mb: 1}}
                    alignItems="center"
                  >
                    <Remove />
                    <Slider
                      name="sepia"
                      min={0}
                      max={100}
                      step={1}
                      // valueLabelDisplay="on"
                      onChange={handleSliderChange}
                      value={filterInputs.sepia}
                    />
                    <Add />
                  </Stack>
                </Grid>
              </Grid>
            )}

            <TextValidator
              fullWidth
              margin="normal"
              size="small"
              placeholder="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
              validators={validators.title}
              errorMessages={errorMessages.title}
            />
            <TextValidator
              multiline
              fullWidth
              margin="normal"
              size="small"
              placeholder="ingredients"
              name="description"
              style={{whiteSpace: 'pre-line'}}
              onChange={handleInputChange}
              value={inputs.description}
              validators={validators.description}
              errorMessages={errorMessages.description}
            />
            <TextValidator
              multiline
              fullWidth
              margin="normal"
              size="small"
              placeholder="instructions"
              name="instructions"
              style={{whiteSpace: 'pre-line'}}
              onChange={handleInputChange}
              value={inputs.instructions}
            />

            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                disabled={allFilled}
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
                sx={{marginTop: '2rem'}}
              >
                Save
              </Button>
            )}
          </ValidatorForm>
        </Grid>
      </Grid>
    </>
  );
};

export default Modify;
