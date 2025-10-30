import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Styled components using MUI's styled API
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
}));

export default function Header({ signedIn, onSignOut }) {
  const onClick = () => {
    if (signedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <StyledAppBar
        position="static"
        color="default"
        elevation={0}
      >
        <StyledToolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            App
          </Typography>
          <StyledButton
            color="primary"
            variant="outlined"
            component={RouterLink}
            to={signedIn ? '/' : '/auth/signin'}
            onClick={onClick}
          >
            {signedIn ? 'Logout' : 'Login'}
          </StyledButton>
        </StyledToolbar>
      </StyledAppBar>
    </React.Fragment>
  );
}
