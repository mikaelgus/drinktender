import {IconButton, ImageList, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';
import {appID} from '../utils/variables';

function Search() {
  // eslint-disable-next-line no-unused-vars
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState([]);

  const {mediaArray} = useMedia(true);
  const {getTag} = useTag();

  const closeFunc = () => {
    setSearchInput('');
    setSearch([]);
  };

  const searchFunc = async (event) => {
    setSearch([]);
    const hakusana = event.target.value;
    setSearchInput(hakusana);
    const searchArray = mediaArray.filter((media) => {
      if (hakusana.length > 0) {
        return media.title.toUpperCase().includes(hakusana.toUpperCase());
      }
    });
    // Hae tagilla
    let tagArray = [];

    try {
      tagArray = await getTag(hakusana + appID);
    } catch (err) {
      console.log(err);
    }
    const fullArray = searchArray.concat(tagArray);

    // setSearch(searchArray);
    setSearch(fullArray);
  };

  console.log(search, mediaArray);

  return (
    <Paper>
      <InputBase
        placeholder="Search..."
        onChange={searchFunc}
        value={searchInput}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <ImageList variant="masonry" gap={8} onClick={closeFunc}>
        {search.map((item, index) => {
          return <MediaRow key={index} file={item} />;
        })}
      </ImageList>
    </Paper>
  );
}

export default Search;
