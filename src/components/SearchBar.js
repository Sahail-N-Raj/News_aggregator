import React, { useState, useEffect } from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ search, setSearch }) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, setSearch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
        },
        borderRadius: 1,
        width: '100%',
        maxWidth: '400px',
        marginLeft: 1,
      }}
    >
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        sx={{
          color: 'inherit',
          paddingLeft: 1,
          width: '100%',
        }}
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
