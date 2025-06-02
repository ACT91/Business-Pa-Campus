import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
//import Connections from './pages/Connections';
//import Notifications from './pages/Notifications';
//import Messages from './pages/Messages';
//import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;