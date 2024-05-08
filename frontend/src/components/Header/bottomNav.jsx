import * as React from 'react';
import Box from '@mui/material/Box';
import './styles.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div className='bottom-nav' sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Explore" icon={<SearchIcon/>} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Log in" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
}
