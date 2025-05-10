import './App.css';
import { useTelegramBackButton } from './hook/useTelegramBackButton';
//import { useTelegram } from './hook/useTelegram';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
//import { useEffect, useState } from 'react';
import { useAuth } from './hook/useAuth';


function App() {
  useTelegramBackButton();
  const [user, loading ] = useAuth();
  if(loading || !user) {
    return (<h1 color='red'>LOADING...</h1>);
  }

  return (
    <Routes>
      <Route path='/' element={<Main/>} />
    </Routes>
  )
}

export default App;
