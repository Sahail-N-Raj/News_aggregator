import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#ADD8E6', padding: '16px 0' }}>
      <Container>
        <Typography
          variant='body2'
          color='textSecondary'
          align='center'
          sx={{ color: 'white' }}
        >
          © 2024 Sahail News Aggregator
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
