import MediaTable from '../components/MediaTable';
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import BottomNav from '../components/BottomNav';
import {useState} from 'react';
import {categories} from '../utils/variables';

const Home = () => {
  console.log();
  const [tags, setTags] = useState([]);
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

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <>
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

      <Grid container justifyContent="center">
        <Typography component="h5" variant="h5" mt={1}>
          Recent posts
        </Typography>
      </Grid>

      <MediaTable tags={tags} />
      <BottomNav />
    </>
  );
};

export default Home;
