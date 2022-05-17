import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import PotlukkCreationPage from './components/PotlukkCreationPage';
import PotlukkHomePage from './components/PotlukkHomePage';
import UserLoginPage from './components/UserLoginPage';
import UserRegistrationPage from './components/UserRegistrationPage';
import './potlukkstyle.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<UserLoginPage/>}/>
        <Route path='/register' element={<UserRegistrationPage/>}/>
        <Route path='/potlukkcreation' element={<PotlukkCreationPage/>}/>
        <Route path='/potlukks' element={<PotlukkHomePage/>} />
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);