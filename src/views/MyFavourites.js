import MediaTable from '../components/MediaTable';
import {Grid, Typography} from '@mui/material';
import {BackButton} from '../components/BackButton';

const MyFavourites = () => {
  return (
    <>
      <BackButton />
      <Grid container justifyContent="center">
        <Typography component="h5" variant="h5">
          My favourites
        </Typography>
      </Grid>
      <MediaTable favouriteFiles={true} />
    </>
  );
};

export default MyFavourites;
