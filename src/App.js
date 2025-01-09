import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import * as ethers from 'ethers';
import React, { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import ClaimButton from './components/ClaimGroup/Claim';
import ConfirmationModal from './components/ConfirmationModal';
import Quests from './components/Quest/Quests';
import ReferralModal from './components/ReferralModal/ReferralModal';
import RewardModal from './components/RewardModal/RewardModal';
import MissionModal from './components/MissionModal/MissionModal';
import UserInfoModal from './components/UserInfoModal/UserInfoModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as appContant from './App.constant';
import ZoomBackground from './components/BackGround/zoomBackground';
import boostMapService from './services/BoostMap.service';
import { calculateNirCapacity, calculateTimeDifferenceInSeconds, calculateValue } from './helper/calculate';
import boostLevelService from './services/BoostLevel.service';
import { boostSpeed } from './services/BoostSpeed.service';
import PreloadImage from './utils/preload';
import { handleClaim } from './services/Claim.service';
import { fetchReferralsBy, fetchUserBy } from './services/Fetch.service';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [maticBalance, setMaticBalance] = useState(0.0);
  const [claimedAmount, setClaimedAmount] = useState(0);

  const [userId, setUserId] = useState('1');
  const [userWallet, setUserWallet] = useState();
  const [userInfo, setUserInfo] = useState(null);

  const [nirCapacity, setNirCapacity] = useState(1);
  const [timeCapacity, setTimeCapacity] = useState(2);

  const [startFromNumber, setStartFromNumber] = useState(0);

  const [lastClaimedAt, setLastClaimedAt] = useState(0);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openUserInfoModal, setOpenUserInfoModal] = useState(false);
  const [openReferralModal, setOpenReferralModal] = useState(false);
  const [openRewardModal, setOpenRewardModal] = useState(false);
  const [openMissionModal, setOpenMissionModal] = useState(false);

  const [modalAction, setModalAction] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalContent2, setModalContent2] = useState('');
  const [countedNir, setCountedNir] = useState(0);
  const [isClaimSucceeded, setIsClaimSucceeded] = useState(false);

  const [isLevelUp, setIsLevelUp] = useState(false);
  const [gifOpacity, setGifOpacity] = useState(1);

  const [isLoadingBackground, setIsLoadingBackground] = useState(true);

  const videoRef = useRef(null);

  const showToast = (message, type = 'info') => {
    toast[type](message, { position: "top-center", transition: appContant.Zoom });
  };

  useEffect(() => {
    if (isLevelUp) {
      const timer = setTimeout(() => {
        setGifOpacity(0);
        setTimeout(() => {
          setIsLevelUp(false);
          setGifOpacity(1);
        }, 500);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isLevelUp]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate a network request with a delay
        // setUserId(6620991827);
        // await loginUser(6620991827);

        if (window.Telegram && window.Telegram.WebApp) {
          const telegramData = window.Telegram.WebApp.initDataUnsafe;
          const telegramUserId = telegramData?.user?.id;
          if (telegramUserId) {
            setUserId(telegramUserId);
            await loginUser(telegramUserId);
          } else {
            navigate('/register');//comment for testing
          }
        } else {
          console.error('Telegram WebApp SDK not loaded.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('Error fetching data. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error('Error attempting to play the video:', error);
      });
    }
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          appContant.RPC_POLYGON_TESTNET
        );

        const balance = await provider.getBalance(userWallet);
        setMaticBalance(+ethers.utils.formatEther(balance));
      } catch (err) {
        showToast(err.message, 'error');
      }
    };

    if (userWallet) {
      getBalance();
    }
  }, [userWallet, claimedAmount, nirCapacity]);

  useEffect(() => {
    const timeDiffInSeconds = calculateTimeDifferenceInSeconds(lastClaimedAt);
    const continueNumber = calculateValue(nirCapacity, timeDiffInSeconds, (userInfo?.level + 1) || 2);

    setStartFromNumber(continueNumber);
  }, [lastClaimedAt, nirCapacity, userInfo?.level]);

  const loginUser = async (telegramUserId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${appContant.backendUrl}login`, {
        phone: `${telegramUserId}`,
      });

      // console.log(response);

      if (response.status !== 200 && response.status !== 201) {
        navigate('/register');
      }

      const {
        userWallet: wallet,
        privateKey,
        speed,
        level,
        road,
        referralCode,
        amount,
        lastClaimTime
      } = response?.data?.data || {};

      const user = {
        wallet,
        privateKey,
        speed: +speed,
        level: +level,
        road: +road,
        referralCode,
        amount: +amount,
        lastClaimTime
      };

      setUserInfo(user);

      setUserWallet(wallet);

      const newNirCapacity = calculateNirCapacity(+level, +speed, +road, appContant);
      setNirCapacity(newNirCapacity);
      setTimeCapacity(+level + 1);

      await fetchUserBy(wallet, setClaimedAmount, setLastClaimedAt, setUserInfo);

      await fetchReferralsBy(referralCode, setUserInfo);

      setIsLoadingBackground(false);

      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error('Error during login:', error);
      navigate('/register');
    }
  };

  useEffect(() => {
    const claimResult = async () => {
      await handleClaim({
        userInfo,
        countedNir,
        maticBalance,
        setClaimedAmount,
        setLastClaimedAt,
        setCountedNir,
        setIsLoading,
        setIsClaimSucceeded,
        showToast,
      });
    };
    claimResult();
  }, [countedNir, maticBalance, userInfo]);

  const handleBoostSpeed = () => {

    if (userInfo.speed >= appContant.MAX_SPEED_LEVEL) {
      showToast('Maximum speed level reached.', 'warning');
      return;
    }

    setModalAction(() => async () => {
      setIsLoading(true);
      try {
        const result = await boostSpeed(userId, userInfo, claimedAmount, showToast);
        if (result) {
          const { newValue, newNirCapacity } = result;
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            speed: newValue,
          }));
          setNirCapacity(newNirCapacity);
          setClaimedAmount((prevClaim) => prevClaim - appContant.boostSpeedCost[+userInfo.speed]);
          setIsLevelUp(true);
          showToast('Speed boosted successfully!', 'success');
        }
      } catch (error) {
        // Error handling is done in the service
      } finally {
        setIsLoading(false);
      }
    });

    setModalTitle('Boost Speed');
    setModalContent('Are you sure you want to boost the speed?');
    setModalContent2(
      <div id="speed-confirm">
        <div className="clock"></div>
        <div className="info">
          <span>Speed {+userInfo.speed + 1}</span>
          <span></span>
        </div>
        <div className="process">
          <div className="process-percent" style={{ width: (+userInfo.speed + 1) / 6 * 100 + '%' }}></div>
        </div>
      </div>
    );
    setOpenConfirmationModal(true);
  };

  const handleBoostLevel = async () => {
    if (userInfo.level >= appContant.MAX_LEVEL) {
      showToast('Maximum level reached.', 'warning');
      return;
    }

    setModalAction(() => async () => {
      setIsLoading(true);
      try {
        // Call the new service function
        const result = await boostLevelService(userId, userInfo, claimedAmount, appContant, showToast);
        if (result) {
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            level: result.newValue,
          }));
          setNirCapacity(result.newNirCapacity);
          setTimeCapacity((prev) => prev + 1);
          setClaimedAmount((prevClaim) => prevClaim - appContant.boostLevelCost[+userInfo.level]);
          setIsLevelUp(true);
          showToast('Time boosted successfully!', 'success');
        }
      } catch (error) {
        console.error('Error boosting time:', error);
        showToast('Error boosting time. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    });

    setModalTitle('Boost Time');
    setModalContent('Are you sure you want to boost the time?');
    setModalContent2(
      <div id="boost-time">
        <div className="clock"></div>
        <div className="info">
          <span>Level {+userInfo.level + 1}</span>
          <span></span>
        </div>
        <div className="process">
          <div className="process-percent" style={{ width: (+userInfo.level + 1) / 6 * 100 + '%' }} ></div>
        </div>
      </div>
    );
    setOpenConfirmationModal(true);
  };

  const handleBoostMap = async () => {
    const newValue = +userInfo.road + 1;
    setModalAction(() => async () => {
      setIsLoading(true);
      try {
        await boostMapService(userId, newValue, maticBalance, userInfo, setUserInfo, setNirCapacity, showToast, setIsLevelUp);
      } catch (error) {
        console.error('Error boosting Map:', error);
        showToast('Error boosting Map. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    });
    setModalTitle('Boost Map');
    setModalContent(
      <span>
        {userInfo.road >= appContant.MAX_LEVEL ? <div className='pt-5'><b>Congratulations!</b> You have reached the maximum level.</div> :
          <>
            Upgrade from <b>{appContant.roadConfig[userInfo.road - 1]?.name}</b> to
            <b> {appContant.roadConfig[newValue - 1]?.name}</b>
          </>
        }
      </span>
    );

    setModalContent2(
      <span>
        {userInfo.road >= appContant.MAX_LEVEL ? <i>Your Journey is still going on...</i> :
          <>
            need <b> {appContant.roadConfig[newValue - 1]?.price || 999} </b> MATIC
          </>
        }
      </span>
    );
    setOpenConfirmationModal(true);
  };

  const handleCloseModal = () => {
    setOpenConfirmationModal(false);
    setModalAction(null);
  };

  const handleCloseUserInfoModal = () => {
    setOpenUserInfoModal(false);
    setModalAction(null);
  };

  const handleConfirmModal = () => {
    if (modalAction) {
      modalAction();
    }
    setOpenConfirmationModal(false);
    setModalAction(null);
  };

  // const handleOpenUserInfo = () => {
  //   setModalAction(() => async () => { });
  //   setOpenUserInfoModal(true);
  // };

  const openReferrals = () => {
    setModalAction(() => async () => { });
    setOpenReferralModal(true);
  };

  const openMissions = () => {
    setModalAction(() => async () => { });
    setOpenMissionModal(true);
  };

  const handleCloseReferralModal = () => {
    setOpenReferralModal(false);
    setModalAction(null);
  };

  const openRewards = () => {
    setOpenRewardModal(true);
    setModalAction(() => async () => { });
  };

  const handleCloseRewardModal = () => {
    setOpenRewardModal(false);
    setModalAction(null);
  };

  const handleCloseMissionModal = () => {
    setOpenMissionModal(false);
    setModalAction(null);
  };

  return (
    <div className='app-container'>
      <div
        className={`App ${isLevelUp ? 'Speedup' : ''}`}
      >
        {/* preload image */}
        <PreloadImage />
        {/* background */}
        <ZoomBackground
          backgroundImages={appContant.roadConfig[userInfo?.road - 1]?.image || appContant.roadConfig[0]?.image}
          duration={appContant.DEFAULT_BG_DURATION - userInfo?.speed * 2}
          isLoading={isLoadingBackground}
        />
        {/* levelup animation */}
        <img
          src='/images/lv_up.gif'
          alt='Level Up'
          className={`${isLevelUp ? 'block' : 'hidden'} absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-1/3`}
          style={{ opacity: gifOpacity, transition: 'opacity 0.5s' }}
        />
        <img
          src='/images/Speedlines.gif'
          alt='Level Up'
          className={`${isLevelUp ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-full z-1`}
          style={{ opacity: gifOpacity, transition: 'opacity 0.5s' }}
        />

        <div className='top-bar'>
          <label className='balance-label'>
            <img
              src={'/images/nir-logo.svg'}
              alt='Lotus Icon'
              style={{ paddingRight: '2px', width: '30px', height: '30px' }}
            />
            {claimedAmount.toFixed(2)} Nir
          </label>
          <label className='balance-label' style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
            <img
              src='/images/matic.png'
              alt='Matic Icon'
              style={{ paddingRight: '2px', width: '25px', height: '25px' }}
            />
            {maticBalance?.toFixed(5)}
          </label>
          {/* <button
            onClick={handleOpenUserInfo}
            className='user-info-button'
            style={{
              background: '#daddc4',
              width: '30px',
              height: '30px',
              borderRadius: '30%',
            }}>
            <FontAwesomeIcon icon={faBars} />
          </button> */}
          <div
            onClick={handleBoostMap}
            className='user-map-button'
          >

            <img className='icon' alt='Road Icon' src={'/images/road-icon.svg'} />

            <span className="road-level">x{userInfo?.road || 1}</span>
            <span className="arrow"></span>
          </div>
        </div>

        <div className='main-part'>
          <ClaimButton
            isLoading={isLoading}
            timeCapacity={timeCapacity}
            nirCapacity={nirCapacity}
            startFromNumber={startFromNumber}
            setCountedNir={setCountedNir}
            isClaimSucceeded={isClaimSucceeded}
            setIsClaimSucceeded={setIsClaimSucceeded}
          />

          <div className='bottom'>
            <ButtonGroup
              handleIncreaseSpeed={handleBoostSpeed}
              handleBoostLevel={handleBoostLevel}
              speedLevel={userInfo?.speed}
              nirCapacity={userInfo?.level}
              isLoading={isLoading}
            />

            <Quests
              openReferrals={openReferrals}
              openRewards={openRewards}
              openMissions={openMissions}
            />
          </div>
        </div>

        <ConfirmationModal
          open={openConfirmationModal}
          handleClose={handleCloseModal}
          handleConfirm={handleConfirmModal}
          title={modalTitle}
          content={modalContent}
          content2={modalContent2}
          modelCountry={appContant.roadConfig[userInfo?.road - 1]?.country || appContant.roadConfig[0]?.country}
          isMaxLevel={userInfo?.road >= appContant.MAX_LEVEL || false}
          isLoading={isLoading}
        />

        <UserInfoModal
          open={openUserInfoModal}
          handleClose={handleCloseUserInfoModal}
          userData={userInfo}
          showToast={showToast}
        />

        <ReferralModal
          open={openReferralModal}
          handleClose={handleCloseReferralModal}
          userData={userInfo}
          showToast={showToast}

        />

        <RewardModal
          open={openRewardModal}
          handleClose={handleCloseRewardModal}
          userData={userInfo}
          showToast={showToast}
          setIsLoading={setIsLoading}
        />

        <MissionModal
          open={openMissionModal}
          handleClose={handleCloseMissionModal}
          userData={userInfo}
          showToast={showToast}
          setIsLoading={setIsLoading}
        />

        <ToastContainer {...appContant.toastConfig} />
      </div>
    </div>
  );
}

export default App;
