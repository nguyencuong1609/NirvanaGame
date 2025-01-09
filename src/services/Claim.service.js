import axios from 'axios';
import * as appContant from '../App.constant';

export const handleClaim = async ({
  userInfo,
  countedNir,
  maticBalance,
  setClaimedAmount,
  setLastClaimedAt,
  setCountedNir,
  setIsLoading,
  setIsClaimSucceeded,
  showToast,
}) => {
  try {
    if (!userInfo?.wallet || countedNir === 0) {
      return;
    }

    if (maticBalance === 0) {
      showToast('Insufficient funds.', 'warning');
      return;
    }

    setIsLoading(true);
    const response = await axios.post(`${appContant.backendUrl}nirs/claim`, {
      wallet: userInfo?.wallet,
      amount: countedNir,
    });

    if (response.status !== 200 && response.status !== 201) {
      console.error('Claim failed:', response.statusText);
      showToast('Claim failed. Please try again.', 'error');
    }

    // console.log('Claim successful:', response?.data);

    setClaimedAmount((prevClaim) =>
      parseFloat((prevClaim + countedNir).toFixed(5))
    );
    setLastClaimedAt(new Date());

    setCountedNir(0);
    setIsClaimSucceeded(true);
    showToast('Claim successful!', 'success');
  } catch (error) {
    console.error('Error claiming amount:', error);

    setCountedNir(0);
    setIsClaimSucceeded(false);
    showToast(
      `Error claiming amount ${error?.message}. Please try again.`,
      'error'
    );
  } finally {
    setIsLoading(false);
  }
};