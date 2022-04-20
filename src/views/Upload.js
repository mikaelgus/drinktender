import {
  Button,
  CircularProgress,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {TextValidator} from 'react-material-ui-form-validator';
import {BackButton} from '../components/BackButton';

const Upload = () => {
  const [preview, setPreview] = useState('logo192.png');
  const alkuarvot = {
    title: '',
    description: '',
  };
  const filterarvot = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  };

  const validators = {
    title: ['required', 'minStringLength: 2'],
    description: ['minStringLength: 2'],
    file: ['isFile', 'maxFileSize: 10000000'],
  };

  const errorMessages = {
    title: ['required field', 'minimun 2 character'],
    description: ['minimun 2 character'],
    file: ['file is not valid', 'max file size 10 MB'],
  };

  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      console.log('doUpload');
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      const mediaData = await postMedia(formdata, token);
      const tagData = await postTag(
        {
          file_id: mediaData.file_id,
          tag: appID,
        },
        token
      );
      confirm(tagData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot
  );

  useEffect(() => {
    if (inputs.file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(inputs.file);
    }
  }, [inputs.file]);

  console.log(inputs, filterInputs);

  // upload button hidden if no tittle and file
  const allFilled = (inputs.title != '') & (inputs.file != undefined);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Upload <BackButton />
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

            <TextValidator
              type="file"
              name="file"
              accept="image/*, video/*, audio/*"
              onChange={handleInputChange}
              validators={validators.file}
              errorMessages={errorMessages.file}
            />

            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                disabled={!allFilled}
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                Upload
              </Button>
            )}
          </ValidatorForm>
        </Grid>
      </Grid>
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
            src={preview}
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
    </>
  );
};

export default Upload;
