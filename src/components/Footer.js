import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer() {
  return (
    <>
      {/* Uncomment if you need navigation in footer */}
      {/* <BirdViewNav style={{ marginBottom: '10px' }} navItems={BirdViewMainNavigation.bird_view_screen}></BirdViewNav> */}
      <footer style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#333', color: 'whitesmoke' }}>
        <Container>
          <Typography variant="body1" sx={{ color: 'whitesmoke' }}>© 2024 NOC</Typography>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
