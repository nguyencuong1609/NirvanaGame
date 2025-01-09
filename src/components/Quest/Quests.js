import './Quests.css';

import React from 'react';

const Quests = ({ openReferrals, openRewards, openMissions }) => {
  return (
    <div className='quests'>
      <button id="mission" className="akaInDic"  onClick={openMissions}>Mission</button>
      <button  id="refs"  className="akaInDic" onClick={openReferrals}>Buddhists</button>
      <button  id="rewards"  className="akaInDic" onClick={openRewards}>Rewards</button>
    </div>
  );
};

export default Quests;
