import MediaTable from '../components/MediaTable';
import {Grid, Typography} from '@mui/material';

const Home = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Typography component="h5" variant="h5" mt={1}>
          Recent posts
        </Typography>
      </Grid>

      <MediaTable />
    </>
  );
};

export default Home;
