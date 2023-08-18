import React, { useCallback, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useCurrentUser from '@/hooks/useCurrentUser';

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        {/* Add other Navbar items here if any */}

        <div style={{ marginLeft: 'auto' }}>
          <IconButton onClick={handleMenuOpen} edge="end">
            <Avatar src="/images/default-blue.png" alt="" />
            <ExpandMoreIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="h6">
                {currentUser?.name}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              signOut();
            }}>
              Sign out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
