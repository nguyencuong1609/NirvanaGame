import './AutoCounter.css';

import React, { useEffect, useRef, useState } from 'react';

const formatNumber = (num, decimalPlaces = 5) => {
  const [wholePart, decimalPart] = num?.toFixed(decimalPlaces).split('.');
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedWholePart.padStart(7, ' ')}.${decimalPart}`;
};

const AutoCounter = React.memo(
  ({
    isLoading,
    speed,
    max,
    startFrom,
    timeCapacity,
    setCountedNir,
    isClaimSucceeded,
    setIsClaimSucceeded,
  }) => {
    const [count, setCount] = useState(startFrom);
    const [incrementAmount, setIncrementAmount] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const [isDisabledClaim, setIsDisabledClaim] = useState(true);

    useEffect(() => {
      if (!isPaused && count < max) {
        intervalRef.current = setInterval(() => {
          setCount((prevCount) => {
            const newCount = prevCount + speed * 0.03;
            return newCount <= max ? newCount : max;
          });

          setIncrementAmount(
            (prevIncrementAmount) => prevIncrementAmount + speed * 0.03
          );
        }, 30);
      } else {
        setIncrementAmount(max);
        setIsDisabledClaim(false);
        clearInterval(intervalRef.current);
      }

      return () => clearInterval(intervalRef.current);
    }, [isPaused, count, max, speed]);

    useEffect(() => {
      setCount(startFrom);
      setIncrementAmount(0);
    }, [startFrom]);

    // const progressPercentage = Math.min((count / max) * 100, 100);

    const handleClaim = () => {
      setCountedNir(count);
    };

    useEffect(() => {
      if (isClaimSucceeded) {
        setCount(0);
        setIsDisabledClaim(true);
        setIsClaimSucceeded(false);
      }
    }, [isClaimSucceeded]);

    return (
      <div className='auto-counter'>
       
        <div className='count'>
          <img
            className='mining-icon'
            src={'/images/nir-logo.svg'}
            alt='Lotus Icon'
            style={{ width: '20px', height: '20px' }}
          />{formatNumber(count)}</div>
        <div className='mining-text'>
        <img className='mining-clock'  src={'/images/sand-clock.svg'}
          alt="Sand Clock"
            style={{ width: '20px', height: '20px' }}
          />
          {max} NIR / {timeCapacity}h
          
        </div>
        {/* <div className='progress-bar-container'>
          <div
            className='progress-bar'
            style={{ width: `${progressPercentage}%` }}
          />
        </div> */}
        <button
          className='claim-button'
          onClick={handleClaim}
          disabled={isDisabledClaim}>
          {isLoading ? <div className='loading-spinner'></div>: 'Claim'}
        </button>
      </div>
    );
  }
);

export default AutoCounter;
