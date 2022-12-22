import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { DefaultContext } from '../Context';
import { goods } from '../db/index.js';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {ReactComponent as DeleteButton} from './icons/icon-delete.svg';

export const Cart = () => {
    const { cart, setCart } = React.useContext(DefaultContext);

    const removeItemFromCart = (id) => {
      setCart((cartCurr) => {
        const copy = {...cartCurr};
        delete copy[id];
        return copy;
      });
      // delete cart[id];
      console.log(cart);
    }

    const oops = () => {
      console.log('DON\'T PUSH THE BUTTON AGAIN!!');
    }

    if (Object.keys(cart).length === 0) return (
        // <span sx={{ width: '310px' }}>
        <>
            <Typography
                variant="p"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    paddingLeft: '1rem',
                    paddingTop: '0.6rem',
                    paddingBottom: '1rem',
                    fontWeight: 700,
                    letterSpacing: '',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Cart
            </Typography>
            <hr style={{ border: '1px solid #dddddd', padding: '0px', margin: '0px' }} />
            <Typography
                variant="p"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    padding: '5rem',
                    fontWeight: 700,
                    letterSpacing: '',
                    color: 'text.secondary',
                    textDecoration: 'none',
                }}
            >
                Your cart is empty.
            </Typography>
        </>
    )

    return (
      <>
        <Typography
          variant="p"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            paddingLeft: '1rem',
            paddingTop: '0.6rem',
            paddingBottom: '1rem',
            fontWeight: 700,
            letterSpacing: '',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Cart
        </Typography>
        <hr style={{ border: '1px solid #dddddd', padding: '0px', margin: '0px' }} />
        {Object.keys(cart).map((item) => (
          <div key={item}>
            {/* onClick={handleCloseUserMenu} */}
            <List sx={{ width: '100%', maxWidth: 360 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={`/img/goods/${item}/image-product-1-thumbnail.jpg`} variant='rounded' />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        { goods[item].name }
                      </Typography>
                    } 
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {`$${goods[item].price * (goods[item].discount / 100)}.00 x ${cart[item]}`}
                        </Typography>
                        <Typography
                          sx={{ display: 'inline', fontWeight: 'bold' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {` $${goods[item].price * (goods[item].discount / 100) * cart[item]}`}
                        </Typography>
                      </>
                    } 
                />
                <IconButton aria-label="delete" sx={{ marginLeft: '0.5rem' }} onClick={() => removeItemFromCart(item)}>
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </List>
          </div>
        ))}
        <Button color="warning" variant="contained" sx={{fontWeight: 'bold', marginLeft: '1rem', marginBottom: '.5rem', paddingY: '1rem', paddingX: '6.45rem'}} onClick={oops}>Checkout</Button>
      </>
    )
}