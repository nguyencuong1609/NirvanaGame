import './LoadingPage.css'; // Example CSS for styling

// LoadingPage.js
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className='loading-spinner'></div>
      <h1>Loading...</h1>
      <img
        className='mining-clock'
        src={'/images/sand-clock.svg'} alt="Sand Clock"
        style={{ width: '36px', height: '36px' }}
      />
    </div>
  );
};

export default LoadingPage;
