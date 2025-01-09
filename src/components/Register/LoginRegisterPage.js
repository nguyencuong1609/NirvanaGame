import './LoginRegisterPage.css';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage = () => {
  const [telegramUserId, setTelegramUserId] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [telegramUserName, setTelegramUserName] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'info') => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const toastConfig = {
    limit: 1,
    position: 'top-right',
    autoClose: 1000,
    newestOnTop: true,
    rtl: false,
    pauseOnFocusLoss: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramData = window.Telegram.WebApp.initDataUnsafe;
      const startParam = telegramData?.start_param;
      const telegramUserId = telegramData?.user?.id;
      const telegramUserName = telegramData?.user?.username;
      setReferralCode(startParam);
      setTelegramUserId(telegramUserId);
      setTelegramUserName(telegramUserName);
      //test 
      // setTelegramUserId('6620991827');
      // setReferralCode('123456');
    } else {
      console.error('Telegram WebApp SDK not loaded.');
    }
  }, []);

  const handleCreateAccount = async () => {
    const backendUrl = 'https://nirvana-game-be.vercel.app/'; // Replace with your backend URL
    if (telegramUserId) {
      try {
        const response = await axios.post(`${backendUrl}register`, {
          phone: `${telegramUserId}`,
          referralCode: referralCode, // Send the extracted code to your backend if needed
          telegramUserName: telegramUserName,
        });
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          console.log('Account created successfully');
          showToast(`Account created successfully`, 'success');
          navigate('/');
        } else {
          console.error('Failed to create account');
        }
      } catch (error) {
        console.error('Error:', error?.response?.data?.message || error);
        showToast(`${error?.response?.data?.message}`, 'error');
      }
    } else {
      console.error('Telegram user ID is not available');
    }
  };

  return (
    <div
      className='login-register-container'
    >

      <img
        src={'/images/login-logo.svg'}
        alt='logo Icon'
        style={{ paddingRight: '2px', width: '60%', height: '30vh' }}
      />
      <div className='akaInDic' style={{ color: '#805211', fontSize: '32px' }}>NIRVANA ADVENTURE</div>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#6C440E',
          color: '#FFF',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
          border: '1px solid #FFF',
          boxShadow: '0 1px 1px 3px RGBA(0,0,0,.15)',
        }}
        onClick={handleCreateAccount}>
        Create New Account
      </button>
      <ToastContainer {...toastConfig} />
    </div>
  );
};

export default LoginRegisterPage;
