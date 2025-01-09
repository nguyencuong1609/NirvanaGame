import { Route, Routes } from 'react-router-dom';

import App from './App';
// src/AppRouter.js
import React from 'react';
import Register from './components/Register/LoginRegisterPage';

const AppRouter = () => (
  <Routes>
    <Route
      path='/'
      element={<App />}
    />
    <Route
      path='/register'
      element={<Register />}
    />
  </Routes>
);

export default AppRouter;
