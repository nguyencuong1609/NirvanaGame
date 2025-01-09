import { Box, Button, Drawer } from '@mui/material';

import React from 'react';

const UserInfoModal = ({ open, handleClose, userData, showToast }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`Copied to clipboard: ${text}`);
        showToast('Copied to clipboard!', 'success');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        showToast('Failed to copy!', 'error');
      });
  };

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={handleClose}
      disableScrollLock
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh',
        },
      }}>
      <Box
        className='drawer-content'
        sx={{
          width: '90%',
          bgcolor: '#daddc4',
          p: 1,
          textAlign: 'center',
          margin: '0 auto',
          height: '100%',
        }}>
        <h2 style={{ marginBlockStart: '0.3em', marginBlockEnd: '0.3em' }}>
          {' '}
          User Info
        </h2>
        <h4
          style={{
            marginBlockStart: '0.3em',
            marginBlockEnd: '0.3em',
            fontWeight: 'bold',
          }}>
          Wallet Address:
        </h4>
        <Box className='flex-container'>
          <Box className='scrollable-box'>{userData?.wallet}</Box>
          <Button
            variant='contained'
            onClick={() => copyToClipboard(userData?.wallet)}
            sx={{ marginLeft: 1 }}
            style={{
              fontWeight: 'bold',
              backgroundColor: '#4D4B35',
            }}>
            Copy
          </Button>
        </Box>

        <h4
          style={{
            marginBlockStart: '0.3em',
            marginBlockEnd: '0.3em',
            fontWeight: 'bold',
          }}>
          Private Key:
        </h4>
        <Box className='flex-container'>
          <Box className='scrollable-box'>{userData?.privateKey}</Box>
          <Button
            variant='contained'
            onClick={() => copyToClipboard(userData?.privateKey)}
            sx={{ marginLeft: 1 }}
            style={{
              fontWeight: 'bold',
              backgroundColor: '#4D4B35',
            }}>
            Copy
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserInfoModal;
