import { cssTransition } from 'react-toastify';
export const RPC_POLYGON_TESTNET = 'https://rpc-amoy.polygon.technology';
export const backendUrl = 'https://nirvana-game-be.vercel.app/';

export const MAX_LEVEL = 6;
export const MAX_SPEED_LEVEL = 6;
export const DEFAULT_SPEED = 2;
export const DEFAULT_BG_DURATION = 52;
export const DEFAULT_BACKGROUND ='/images/hoi_an.webp';
export const roadConfig = [
  {
    name: 'VietNam',
    speed: 1,
    bonus: 0,
    disabled: false,
    price: 0.001,
    country: 'Vietnam',
    background:
      '/images/city/vietnam1.png',
    image : ['/images/city/vietnam1.png', '/images/city/vietnam2.png', '/images/city/vietnam3.png','/images/city/vietnam2.png']
  },
  {
    name: 'ThaiLan - Road',
    speed: 2,
    bonus: 0.25,
    disabled: false,
    price: 0.0001,
    background: '/images/city/thailan1.png',
    country: 'Thailand',
    image : ['/images/city/thailan1.png', '/images/city/thailan2.png', '/images/city/thailan3.png', '/images/city/thailan4.png']
  },
  {
    name: 'Tibet(China) - Road',
    speed: 3,
    bonus: 0.5,
    disabled: false,
    price: 0.0001,
    background: '/images/city/china1.png',
    country: 'China',
    image : ['/images/city/china1.png', '/images/city/china2.png', '/images/city/china3.png', '/images/city/china4.png']
  },
  {
    name: 'Indonesia',
    speed: 4,
    bonus: 0.75,
    disabled: false,
    price: 0.0001,
    background: '/images/city/indo1.png',
    country: 'Indonesia',
    image : ['/images/city/indo1.png', '/images/city/indo2.png', '/images/city/indo3.png', '/images/city/indo4.png']
  },
  {
    name: 'India',
    speed: 5,
    bonus: 1,
    disabled: false,
    price: 0.0001,
    background: '/images/city/india1.png',
    country: 'India',
    image : ['/images/city/india1.png', '/images/city/india2.png', '/images/city/india3.png', '/images/city/india4.png']
  },
  {
    name: 'Nepal',
    speed: 6,
    bonus: 1.5,
    disabled: false,
    price: 0.0001,
    background: '/images/city/nepal1.png',
    country: 'Nepal',
    image : ['/images/city/nepal1.png', '/images/city/nepal2.png', '/images/city/nepal3.png', '/images/city/nepal4.png']
  },
];
export const levelConfig = [2, 3, 4, 5, 6, 7]; // hours
export const speedConfig = [0, 0.25, 0.5, 0.75, 1, 1.25];

export const boostLevelCost = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 2,
};

export const boostSpeedCost = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 2,
};

export const toastConfig = {
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
export const Zoom = cssTransition({
  enter: 'animate__animated animate__fadeInDown', 
  exit: 'animate__animated animate__slideOutUp', 
});