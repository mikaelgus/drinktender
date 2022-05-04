import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import {useMedia, useTag, useUser} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID, categories} from '../utils/variables';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {TextValidator} from 'react-material-ui-form-validator';
import {Add, Remove} from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Upload = () => {
  const [logged, setLogged] = useState(false);
  const {getUser} = useUser();
  const [preview, setPreview] = useState('drink175.png');
  const alkuarvot = {
    title: '',
    description: '',
    instructions: '',
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
  const [tags, setTags] = useState([]);

  const doUpload = async () => {
    try {
      console.log('doUpload');
      const desc = {
        description: inputs.description,
        instructions: inputs.instructions,
        filters: filterInputs,
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      const mediaData = await postMedia(formdata, token);
      console.log(mediaData);
      for (let i = 0; i < tags.length; i++) {
        const tempTag = tags[i] + appID;
        console.log("JSON.stringify(tempTag)");
        console.log(JSON.stringify(tempTag))
        await postTag(
          {
            file_id: mediaData.file_id,
            tag: tempTag,
          },
          token
        );
      }
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

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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

  const isLogged = async () => {
    const userData = await getUser(localStorage.getItem('token'));
    if (userData !== null || undefined) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <>
      {logged ? (
        <Grid container justifyContent="center" sx={{marginBottom: '2rem'}}>
          <Grid textAlign="center" item xs={10}>
            <Typography component="h5" variant="h5" mt={1} mb={2}>
              Post a recipe
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container justifyContent="center">
                <Grid item xs={8}>
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
                      src={preview}
                      alt="preview"
                    />
                  </Grid>
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

                <Grid container justifyContent="center">
                  <TextValidator
                    margin="normal"
                    size="small"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    validators={validators.file}
                    errorMessages={errorMessages.file}
                  />
                </Grid>
              </Grid>

              <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={tags}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {categories.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={tags.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                style={{whiteSpace: 'pre-wrap'}}
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
                style={{whiteSpace: 'pre-wrap'}}
                onChange={handleInputChange}
                value={inputs.instructions}
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
                  sx={{marginTop: '2rem'}}
                >
                  Post
                </Button>
              )}
            </ValidatorForm>
          </Grid>
        </Grid>
      ) : (
        'Please log in to upload drinks'
      )}
    </>
  );
};

export default Upload;
