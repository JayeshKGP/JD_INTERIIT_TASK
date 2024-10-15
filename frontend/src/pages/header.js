import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND;

const coolTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
  },
}));

function CoolHeader() {
    const [islogin, setislogin] = useState(false);
    useEffect(() => {
        const auth = localStorage.getItem('auth')
        if(auth === 'true'){
            setislogin(true);
        }
      }
    , []);

  const handleSearchClick = () => {
    // This function will be implemented later
    window.location.href = '/search';
  };

  return (
    <ThemeProvider theme={coolTheme}>
      <AppBar position="static" color="transparent" elevation={0}>
        <StyledToolbar>
            <IconButton color="inherit" onClick={() => window.location.href = '/'}>
                <HomeIcon />
            </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Tree View
          </Typography>
          
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleSearchClick} aria-label="search">
              <SearchIcon />
            </IconButton>
            {islogin ? <Button color="inherit" startIcon={<AccountCircle />} sx={{ ml: 1 }} onClick={()=>{
                axios.get(backend+'signout')
                .then(response => {
                    localStorage.setItem('auth', 'false');
                    setislogin(false);
                    window.location.href = '/';
                })
                .catch(error => {
                    alert('There was an error!');
                });
            }}>
              Logout
            </Button> :
            <Button color="inherit" startIcon={<AccountCircle />} sx={{ ml: 1 }} onClick={()=>{
                window.location.href = '/login';
            }}>
              Login
            </Button>}
          </Box>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default CoolHeader;