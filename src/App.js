import { Avatar, Box, Container, createTheme, Grid, IconButton, Modal, Button, Tab, Tabs, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography, ButtonGroup } from "@mui/material";
// import { Box } from "@mui/system";
import React, { useState } from "react";
import { MyAppBar } from "./component/app-bar";
import { DefaultContext } from "./Context";
import { goods } from "./db";
import { ReactComponent as CloseButton } from './component/icons/icon-close.svg';
import { ReactComponent as MinusButton } from './component/icons/icon-minus.svg';
import { ReactComponent as PlusButton } from './component/icons/icon-plus.svg';
// import {ReactComponent as CartButton} from './component/icons/icon-cart.svg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  // bgcolor: 'background.paper',
  bgcolor: 'rgba(0, 0, 0, .0)',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cart, setCart] = useState({});

  const [link, setLink] = useState('/img/goods/fles/image-product-1.jpg');
  const [linkLightBox, setLinkLightBox] = useState('/img/goods/fles/image-product-1.jpg');

  const [amount, setAmount] = useState(0);
  const decreaseAmount = () => {
    setAmount((amount) => {
      if (amount === 0)
        return amount;
      return amount-1;
    });
  };
  const increaseAmount = () => {
    setAmount((amount) => {return amount+1});
  };

  const addToCart = () => {
    if (amount !== 0)
      if ('fles' in cart) {
        // cart.fles += 1;
        // console.log(123123123);
        setCart({
          ...cart,
          fles: cart.fles + amount
        });
      } else {
        setCart({
          ...cart,
          fles: amount
        });
      }
  };

  return (
    <DefaultContext.Provider value={{ cart, setCart }}>
      <Container>
        <MyAppBar />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{paddingTop: '5rem', paddingX: '3rem'}}>
          <Grid item xs={6} sx={{paddingRight: '5rem'}}>
            <img onClick={handleOpen} src={`${link}`} width='100%' style={{borderRadius: '4%', marginBottom: '2rem'}} />

            <Grid container spacing={5} columns={4}>
              {goods.fles.imageUrls.map((image) => (
                <Grid item xs={1} key={image.original}>
                  <ToggleButton value={`/img/goods/fles/${image.original}`} sx={{padding:'0px', border: '0px'}} onClick={() => setLink('/img/goods/fles/' + image.original)}>
                    <Avatar variant='rounded' src={`/img/goods/fles/${image.thumbnail}`} sx={{outline: link === '/img/goods/fles/'+image.original ? '3px solid darkorange' : '', filter: link === '/img/goods/fles/'+image.original ? 'brightness(1.4)' : '', height: '80px', width: '80px'}} />
                  </ToggleButton>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={6} sx={{paddingLeft: '5rem'}}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'orange',
                textDecoration: 'none',
                marginTop: '3rem'
              }}
            >
              {goods.fles.companyName}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                // fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'black',
                textDecoration: 'none',
                marginTop: '1rem'
              }}
            >
              {goods.fles.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                letterSpacing: '.1rem',
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '15px',
                marginTop: '1rem',
                paddingBottom: '2rem'
              }}
            >
              {goods.fles.description}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mr: 2,
                display: 'inline',
                letterSpacing: '.1rem',
                color: 'black',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '3rem'
              }}
            >
              ${goods.fles.price * (goods.fles.discount/100)}.00
            </Typography>
            <Button variant="text" sx={{color: 'darkorange', lineHeight: '20px', marginBottom: '1.2rem', fontSize: '20px', fontWeight: 'bold', bgcolor: '#FFF6CF'}}>{goods.fles.discount}%</Button>
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                // display: 'inline',
                letterSpacing: '.1rem',
                color: 'lightgrey',
                textDecoration: 'line-through',
                fontWeight: 'bold',
                // marginTop: '1rem'
              }}
            >
              ${goods.fles.price}
            </Typography>
            <ButtonGroup variant="neutral" aria-label="text primary button group" sx={{marginTop: '3rem', paddingY: '.3rem'}}>
              <Button onClick={decreaseAmount} sx={{paddingX: '1.3rem', paddingY: '1.7rem', bgcolor: '#F0F0F0'}}><MinusButton/></Button>
              <Button sx={{fontWeight: 'bold', fontSize: '20px', paddingX: '1.3rem', bgcolor: '#F0F0F0'}}>{amount}</Button>
              <Button onClick={increaseAmount} sx={{paddingX: '1.3rem', bgcolor: '#F0F0F0'}}><PlusButton/></Button>
            </ButtonGroup>
            <Button color="warning" variant="contained" sx={{fontWeight: 'bold', marginLeft: '1rem', paddingY: '1rem', paddingX: '4rem'}} onClick={addToCart}><AddShoppingCartIcon/>Add to cart</Button>
          </Grid>
        </Grid>

      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: 'right' }}>
            <IconButton aria-label="delete" sx={{ color: '#FFA500', textAlign: 'right' }}>
              <CloseIcon sx={{ textAlign: 'right' }} onClick={handleClose} />
            </IconButton>
          </Box>
          <Grid item xs={6}>
            <img onClick={handleOpen} src={`${linkLightBox}`} width='100%' style={{borderRadius: '4%', marginBottom: '2rem'}} />

            <Grid container spacing={{ xs: 0, sm: 0, md: 0 }} columns={4} sx={{paddingLeft: '3.3rem'}}>
              {goods.fles.imageUrls.map((image) => (
                <Grid item xs={1} key={image.original}>
                  <ToggleButton value={`/img/goods/fles/${image.original}`} sx={{padding:'0px', border: '0px'}} onClick={() => setLinkLightBox('/img/goods/fles/' + image.original)}>
                    <Avatar variant='rounded' src={`/img/goods/fles/${image.thumbnail}`} sx={{outline: linkLightBox === '/img/goods/fles/'+image.original ? '3px solid darkorange' : '', filter: linkLightBox === '/img/goods/fles/'+image.original ? 'brightness(1.4)' : '', height: '80px', width: '80px'}} />
                  </ToggleButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </DefaultContext.Provider>
  );
}

export default App;
