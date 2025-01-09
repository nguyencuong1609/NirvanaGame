import React from 'react';
import { Box, Button, Modal, Zoom } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './ReferralModal.css';

const BASE_LINK = 'https://t.me/NirvanaAppBot/NirvanaGame';
const ReferralModal = ({ open, handleClose, userData, showToast }) => {
  const copyToClipboard = (text) => {
    const fullLink = text ? `${BASE_LINK}?startapp=${text}` : BASE_LINK;
    navigator.clipboard
      .writeText(fullLink)
      .then(() => {
        console.log(`Copied to clipboard: ${fullLink}`);
        showToast('Copied to clipboard!', 'success');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        showToast('Failed to copy!', 'error');
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}>
      <Zoom in={open}>
        <Box
          className='drawer-content'
          sx={{
            width: '100%',
            bgcolor: 'linear-gradient(to bottom, #69410D, #482A02)',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
            p: 0,
            textAlign: 'center',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '14px',
            height: '20vh',
          }}>
          <h2 className="sticky-title akaInDic" >
            {' '}
            Your Referral Link
          </h2>
          <h4
            style={{
              marginBlockStart: '0.3em',
              marginBlockEnd: '0.3em',
              fontWeight: 'bold',
            }}></h4>
          <Box className='flex-container'>
            <Box className='scrollable-box'>
              {userData?.referralCode
                ? `${BASE_LINK}?startapp=${userData?.referralCode}`
                : BASE_LINK}
            </Box>
            <Button
              variant='contained'
              onClick={() => copyToClipboard(userData?.referralCode)}
              sx={{ marginLeft: 1 }}
              style={{
                backgroundColor: '#6c440e',
                borderRadius: '6px',
                height: '34px',
                fontSize: '1.1rem',
                minWidth: '50px'
              }}>
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default ReferralModal;
