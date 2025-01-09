import axios from 'axios';
import * as appContant from '../App.constant';
import { calculateNirCapacity } from '../helper/calculate';

const boostMapService = async (userId, newValue, maticBalance, userInfo, setUserInfo, setNirCapacity, showToast, setIsLevelUp) => {

  if (userInfo.road >= appContant.MAX_LEVEL) {
    showToast('Maximum level reached.', 'warning');
    return;
  }

  if (maticBalance < appContant.roadConfig[newValue - 1].price) {
    showToast('Insufficient funds.', 'warning');
    return;
  }
  const response = await axios.post(`${appContant.backendUrl}users/update-road`, {
    phone: userId.toString(),
    road: newValue,
  });
  
  if (response.status === 200 || response.status === 201) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      road: newValue,
    }));

    const newNirCapacity = calculateNirCapacity(
      +userInfo.level,
      +userInfo.speed,
      +newValue,
      appContant
    );
    setNirCapacity(newNirCapacity);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // hack to load images.
    setIsLevelUp(true);
    showToast('Map boosted successfully!', 'success');
  } else {
    console.error('Failed to boost Map:', response.statusText);
    showToast('Failed to boost Map. Please try again.', 'error');
  }
};

export default boostMapService;