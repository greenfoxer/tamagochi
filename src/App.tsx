import './App.css';
import { useTelegramBackButton } from './hook/useTelegramBackButton';
//import { useTelegram } from './hook/useTelegram';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
//import { useEffect, useState } from 'react';
import { useAuth } from './hook/useAuth';

function App() {
  useTelegramBackButton();
  const {user, loading } = useAuth();
  //const {isTelegram, user} = useTelegram();

  // const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   if(!user) return;
  //   const fetchUser = async () => {
  //     try{
  //       const fetchurl = "https://roman-tamagochi-server-test.loca.lt";//'https://tamagochi-app.vercel.app';
  //       console.log(`Fetch URL: ${fetchurl}`);
        
  //       const response = await fetch(fetchurl+'/login',{
  //         method: 'POST',
  //         headers: {
  //           'Content-Type' : 'application/json'
  //         },
  //         mode: 'cors',
  //         body: JSON.stringify({user}),
  //       });
  //       console.log(response);
  //       const data = await response.json();
  //       console.log(data);
  //       setLoading(false);
  //     } catch (error){
  //       console.error('Error fetching user: ', error);
  //     }
  //   };
  //   fetchUser();
  // },[user]);
  
  console.log('isTelegram: ', user);
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
