import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ReminderApp from './components/ReminderApp';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reminderapp" element={<ReminderApp />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
