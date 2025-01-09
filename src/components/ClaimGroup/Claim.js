import './Claim.css';

import React, { useState } from 'react';

import AutoCounter from '../AutoCounter/AutoCounter';
import { SIMULATE_SPEED } from '../../utils/constants';

const ClaimButton = ({
  isLoading = false,
  startFromNumber = 0,
  timeCapacity = 2,
  nirCapacity = 1,
  setCountedNir = () => {},
  isClaimSucceeded = false,
  setIsClaimSucceeded = () => {},
}) => {
  const [counterKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className='claim' style={{zIndex: 3}}>
      <div className='claim-container' >
        <AutoCounter
          isLoading={isLoading}
          key={counterKey}
          speed={(SIMULATE_SPEED * nirCapacity) / (timeCapacity * 3600)}//FAKE
          // speed={(nirCapacity)/(timeCapacity * 3600)} //REAL
          max={nirCapacity}
          startFrom={startFromNumber}
          isPaused={isPaused}
          setCountedNir={setCountedNir}
          isClaimSucceeded={isClaimSucceeded}
          setIsClaimSucceeded={setIsClaimSucceeded}
          timeCapacity={timeCapacity}
        />
      </div>
       
    </div>
  );
};

export default ClaimButton;
