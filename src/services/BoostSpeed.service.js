import axios from 'axios';
import { calculateNirCapacity } from '../helper/calculate';
import * as appContant from '../App.constant';

export const boostSpeed = async (userId, userInfo, claimedAmount, showToast) => {
  if (appContant.boostSpeedCost[userInfo.speed] > claimedAmount) {
    showToast('Insufficient funds.', 'warning');
    return;
  }

  const newValue = +userInfo.speed + 1;
  try {
    const response = await axios.post(
      `${appContant.backendUrl}users/update-level-speed`,
      {
        phone: userId.toString(),
        level: userInfo.level,
        speed: newValue,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      console.error('Failed to boost speed:', response.statusText);
      showToast('Failed to boost speed. Please try again.', 'error');
      return;
    }

    const newNirCapacity = calculateNirCapacity(
      +userInfo.level,
      +newValue,
      +userInfo.road,
      appContant
    );

    return { newValue, newNirCapacity };
  } catch (error) {
    console.error('Error boosting speed:', error);
    showToast('Error boosting speed. Please try again.', 'error');
  }
};