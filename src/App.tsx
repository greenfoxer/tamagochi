import './App.css';
import { useTelegramBackButton } from './hook/useTelegramBackButton';
import { useTelegram } from './hook/useTelegram';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { useEffect, useState } from 'react';

function App() {
  useTelegramBackButton();
  const {isTelegram, user} = useTelegram();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(!user) return;
    const fetchUser = async () => {
      try{
        const response = await fetch('http://localhost:3000/login',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({user}),
        });
        const data = await response.json();
        console.log(data);
        setLoading(false);
      } catch (error){
        console.error('Error fetching user: ', error);
      }
    };
    fetchUser();
  },[user]);
  
  console.log('isTelegram: ', isTelegram, user);
  if(loading) {
    return (<h1 color='red'>LOADING...</h1>);
  }

  return (
    <Routes>
      <Route path='/' element={<Main/>} />
    </Routes>
  )
}

export default App;
