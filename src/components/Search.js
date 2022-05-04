/* eslint-disable no-unused-vars */
import {
  alpha,
  InputBase,
  MenuList,
  MenuItem,
  styled,
  Typography,
  Popover,
  Box,
  Paper,
  IconButton,
  ListItemText,
  ImageList,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {appID} from '../utils/variables';
import SearchList from './SearchList';

function Search() {
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
      // console.log(err);
    }
    console.log(hakusana);

    const fullArray = searchArray.concat(tagArray);
    if (hakusana) {
      setSearch(fullArray);
    }
  };

  return (
    <>
      <Paper>
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search..."
          onChange={searchFunc}
          value={searchInput}
        />
      </Paper>
      <ImageList
        variant="masonry"
        style={{zIndex: 1}}
        gap={8}
        onClick={closeFunc}
      >
        {search.map((item, index) => {
          return <SearchList key={index} file={item} />;
        })}
      </ImageList>
    </>
  );
}

export default Search;
