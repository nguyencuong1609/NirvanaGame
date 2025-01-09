import { DEFAULT_SPEED } from '../../App.constant';
import './ButtonGroup.css';

import CustomAction from './CustomAction';
import React from 'react';

const ButtonGroup = ({ handleBoostLevel, handleIncreaseSpeed, speedLevel, nirCapacity, isLoading }) => {
  return (
    <div className='w-full flex justify-between p-5 text-white'>
      <CustomAction
        id="boost"
        title='Level Up'
        name='Boost'
        info={`${nirCapacity + 1 || 2} Hours`}
        onClick={handleBoostLevel}
        isLoading={isLoading}
      />
      <CustomAction
        id="speed"
        title='Speed'
        name='Speed'
        info={`${DEFAULT_SPEED * speedLevel || DEFAULT_SPEED} km/h`}
        onClick={handleIncreaseSpeed}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ButtonGroup;
