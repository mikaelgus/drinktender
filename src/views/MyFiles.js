import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import {BackButton} from '../components/BackButton';

const MyFiles = () => {
  return (
    <>
      <Typography component="h1" variant="h2">
        MyFiles
      </Typography>
      <BackButton />
      <MediaTable allFiles={false} />
    </>
  );
};

export default MyFiles;
