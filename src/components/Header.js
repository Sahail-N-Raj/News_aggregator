import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from './SearchBar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Header = ({
  search,
  setSearch,
  openFilterDialog,
  openPreferences,
  hasActiveFilter,
  hasActivePreferences,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container alignItems='center' spacing={2}>
          <Grid item xs={2} sm={3} md={2}>
            <Typography variant='h6'>News </Typography>
          </Grid>
          <Grid item xs={8} sm={6} md={6} container justifyContent='center'>
            <SearchBar search={search} setSearch={setSearch} />
          </Grid>
          <Grid item xs={2} sm={3} md={4} container justifyContent='flex-end'>
            {isMobile ? (
              <>
                <IconButton color='inherit' onClick={handleDrawerOpen}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor='right'
                  open={drawerOpen}
                  onClose={handleDrawerClose}
                >
                  <IconButton
                    color='inherit'
                    onClick={handleDrawerClose}
                    style={{ margin: '10px', borderRadius: '0' }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Button
                    color='inherit'
                    onClick={openFilterDialog}
                    sx={{
                      color: hasActiveFilter ? 'orange' : 'inherit',
                      margin: '20px',
                    }}
                  >
                    <FilterAltIcon />
                    Filter
                  </Button>
                  <Button
                    color='inherit'
                    onClick={openPreferences}
                    sx={{
                      color: hasActivePreferences ? 'orange' : 'inherit',
                      margin: '20px',
                    }}
                  >
                    Preferences
                  </Button>
                </Drawer>
              </>
            ) : (
              <>
                <Button
                  color='inherit'
                  onClick={openFilterDialog}
                  style={{}}
                  sx={{
                    color: hasActiveFilter ? 'orange' : 'inherit',
                    marginLeft: '20px',
                  }}
                >
                  <FilterAltIcon />
                </Button>
                <Button
                  color='inherit'
                  onClick={openPreferences}
                  sx={{
                    color: hasActivePreferences ? 'orange' : 'inherit',
                    margin: '20px',
                  }}
                >
                  Preferences
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
