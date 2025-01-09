import axios from 'axios';
import { calculateNirCapacity } from '../helper/calculate';

const boostLevelService = async (userId, userInfo, claimedAmount, appContant, showToast) => {
  
  if (appContant.boostLevelCost[userInfo.level] > claimedAmount) {
    showToast('Insufficient funds.', 'warning');
    return null;
  }

  const newValue = +userInfo.level + 1;

  const response = await axios.post(
    `${appContant.backendUrl}users/update-level-speed`,
    {
      phone: userId.toString(),
      level: newValue,
      speed: userInfo.speed,
    }
  );

  if (response.status === 200 || response.status === 201) {
    const newNirCapacity = calculateNirCapacity(
      +newValue,
      +userInfo.speed,
      +userInfo.road,
      appContant
    );

    return { newValue, newNirCapacity };
  } else {
    console.error('Failed to boost time:', response.statusText);
    showToast('Failed to boost time. Please try again.', 'error');
    return null;
  }
};

export default boostLevelService;