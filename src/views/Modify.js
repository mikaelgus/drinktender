import {
  Button,
  CircularProgress,
  Grid,
  Slider,
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

const Modify = () => {
  const location = useLocation();
  const file = location.state.file;

  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {},
  };

  console.log(file);

  const alkuarvot = {
    title: file.title,
    description: description,
  };

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

      confirm(mediaData.message) && navigate(-1);
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
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Modify <BackButton />
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              fullWidth
              placeholder="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
              validators={validators.title}
              errorMessages={errorMessages.title}
            />
            <TextValidator
              fullWidth
              placeholder="description"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
              validators={validators.description}
              errorMessages={errorMessages.description}
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
              >
                Save
              </Button>
            )}
          </ValidatorForm>
        </Grid>
      </Grid>
      {file && (
        <Grid container>
          <Grid item xs={12}>
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
          <Grid container>
            <Grid item xs={12}>
              <Slider
                name="brightness"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.brightness}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Slider
                name="contrast"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.contrast}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Slider
                name="saturate"
                min={0}
                max={200}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.saturate}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Slider
                name="sepia"
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                value={filterInputs.sepia}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Modify;
