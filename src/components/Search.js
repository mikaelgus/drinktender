import {InputBase, Paper, IconButton, List} from '@mui/material';
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
      <Paper
        sx={{
          display: 'flex',
          width: '75%',
          margin: 'auto',
          marginTop: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <InputBase
          placeholder="Search..."
          sx={{flex: '1', paddingLeft: '1rem'}}
          onChange={searchFunc}
          value={searchInput}
        />
        <IconButton
          disabled={true}
          aria-label="search"
          sx={{marginLeft: 'auto'}}
        >
          <SearchIcon />
        </IconButton>

        <List
          variant="masonry"
          sx={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: '2.6rem',
            left: '0',
            right: '0',
            width: '70%',
            maxWidth: '70%',
            maxHeight: '50%',
          }}
          gap={8}
          onClick={closeFunc}
        >
          {search.map((item, index) => {
            return (
              <>
                <List>
                  <SearchList key={index} file={item} />
                </List>
              </>
            );
          })}
        </List>
      </Paper>
    </>
  );
}

export default Search;
