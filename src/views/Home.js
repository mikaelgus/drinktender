import MediaTable from '../components/MediaTable';
import {Grid, Typography} from '@mui/material';
import BottomNav from '../components/BottomNav';

const Home = () => {
  return (
    <>
      <BottomNav />
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
