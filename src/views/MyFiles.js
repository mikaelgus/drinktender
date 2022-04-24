import MediaTable from '../components/MediaTable';
import {Grid, Typography} from '@mui/material';
import {BackButton} from '../components/BackButton';

const MyFiles = () => {
  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <Typography component="h5" variant="h5">
          My posts
        </Typography>
      </Grid>

      <MediaTable allFiles={false} />
    </>
  );
};

export default MyFiles;
