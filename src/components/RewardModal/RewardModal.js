import './RewardModal.css';

import { Box, Button, Modal, Zoom } from '@mui/material';
import React, { useEffect } from 'react';

import axios from 'axios';

const BASE_LINK = 'https://t.me/NirvanaAppBot/NirvanaGame';
const backendUrl = 'https://nirvana-game-be.vercel.app/';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const RewardModal = ({
  open,
  handleClose,
  userData,
  showToast,
  setIsLoading,
}) => {
  const [referralIds, setReferralIds] = React.useState([]);
  const [referrals, setReferrals] = React.useState([]);
  const [unClaimedReferrals, setUnClaimedReferrals] = React.useState(0);

  useEffect(() => {
    const fetchReferralCodes = async () => {
      const userReferrals = userData?.referrals || [];
      const temp = userReferrals.map((referral) => referral._id);
      const unclaimed = userReferrals.filter(
        (referral) => !referral.redeemed
      ).length;
      setUnClaimedReferrals(unclaimed);
      setReferrals(userReferrals);
      setReferralIds(temp);
    };
    fetchReferralCodes();
  }, [userData]);

  const redeem = async () => {
    const uniqueReferralIds = [...new Set(referralIds)];
    setIsLoading(true);
    try {
      await axios.post(`${backendUrl}/users/referral/redeem`, {
        referralIds: uniqueReferralIds,
      });
      showToast('Referral codes redeemed successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
    setIsLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Zoom in={open}>
        <Box
          className='drawer-content1'
          sx={{
            width: '100%',
            bgcolor: '#daddc4',
            p: 0,
            textAlign: 'center',
            margin: '0 auto',
            borderRadius: '14px',
            height: '20vh',
          }}>
          <div className='sticky-title akaInDic'>
            Your Referral Rewards
          </div>
          {referrals.length > 0 ? (
            referrals.map((ref, index) => (
              <Box
                className='flex-container'
                key={ref._id + index}>
                <Box className='scrollable-box'>
                  {ref._id} - {formatDate(ref.createdAt)}
                </Box>
                <Button
                  variant='contained'
                  className='copy-button'
                  sx={{ marginLeft: 2 }}
                  style={{
                    fontWeight: 'bold',
                    backgroundColor: '#4D4B35',
                  }}
                  disabled={ref.redeemed}>
                  {ref.redeemed ? 'Claimed' : '1 NIR'}
                </Button>
              </Box>
            ))
          ) : (
            <Box sx={{ my: 2 }}>No referrals available.</Box>
          )}
          {referrals.length > 0 && (
            <Button
              variant='contained'
              onClick={redeem}
              sx={{ marginTop: 2 }}
              style={{
                fontWeight: 'bold',
                backgroundColor: '#4D4B35',
              }}>
              {'Claim '}
              {unClaimedReferrals === referralIds.length
                ? ' All'
                : `${unClaimedReferrals} NIRS`}
            </Button>
          )}
        </Box>
      </Zoom>
    </Modal>
  );
};

export default RewardModal;
