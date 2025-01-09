import './CustomAction.css';

import React from 'react';

const CustomAction = ({ name, info, title, onClick, id, isLoading }) => {
  return (
    <div className={`flex w-36 custom-action relative flex-col h-28 items-left`} id={id} onClick={!isLoading ? onClick : undefined}>
      <div className='custom-action-name mt-1 ml-2 w-3/4 text-2xl text-left transform translate-y-2'>{name}</div>
      <div className='custom-action-info ml-4 my-1 mt-1.5 w-3/4 text-sm text-left'>{info}</div>
      <button
        className={`self-center text-center text-sm bg-linear-gradient w-3/4 p-1 rounded-md mr-2`}
        style={{ background: 'linear-gradient(to bottom, #69410D, #482A02)' }}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomAction;
