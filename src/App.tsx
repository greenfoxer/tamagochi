import './App.css';
import { useTelegramBackButton } from './hook/useTelegramBackButton';
import { useTelegram } from './hook/useTelegram';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  useTelegramBackButton();
  const {isTelegram, user} = useTelegram();
  console.log('isTelegram: ', isTelegram, user);
  return (
    <Routes>
      <Route path='/' element={<Main/>} />
    </Routes>
  )
}

export default App;
