import { useState, useEffect } from 'react';
import './Main.css';
import TopPanel from '../components/TopPanel';
import ActionButtons from '../components/ActionButtons';
import PetContainer from '../components/PetContainer';
import Background from '../components/Background';
import backgroundImage from '../assets/images/background.png';

import petLevel1Image from '../assets/images/pets/pet-level1.png';
import petLevel2Image from '../assets/images/pets/pet-level2.png';
import petLevel3Image from '../assets/images/pets/pet-level3.png';
import petLevel4Image from '../assets/images/pets/pet-level4.png';


function Main() {
  // Загружаем данные из localStorage при старте приложения
  const loadPetState = () => {
    try {
      const savedState = localStorage.getItem('petState');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
    
    // Значения по умолчанию, если данных нет - начинаем с 1 уровня
    return {
      level: 1,
      hunger: 100,
      happiness: 100,
      energy: 100,
      knowledge: 0,
      health: 100
    };
  };
  
  // Функция сброса данных (для отладки)
  const resetPetData = () => {
    try {
      localStorage.removeItem('petState');
      window.location.reload(); // Перезагрузка страницы для применения начальных данных
    } catch (error) {
      console.error('Ошибка при сбросе данных:', error);
    }
  };
  
  // Инициализируем состояние из localStorage
  const initialState = loadPetState();
  
  const [level, setLevel] = useState<number>(initialState.level);
  const [hunger, setHunger] = useState<number>(initialState.hunger);
  const [happiness, setHappiness] = useState<number>(initialState.happiness);
  const [energy, setEnergy] = useState<number>(initialState.energy);
  const [knowledge, setKnowledge] = useState<number>(initialState.knowledge);
  const [health, setHealth] = useState<number>(initialState.health);
  
  // Сохраняем данные в localStorage при изменении состояния
  useEffect(() => {
    const petState = {
      level,
      hunger,
      happiness,
      energy,
      knowledge,
      health
    };
    
    try {
      localStorage.setItem('petState', JSON.stringify(petState));
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }, [level, hunger, happiness, energy, knowledge, health]);
  
  // Периодическое снижение показателей
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev: number) => Math.max(0, prev - 2));
      setHappiness((prev: number) => Math.max(0, prev - 1));
      setEnergy((prev: number) => Math.max(0, prev - 1.5));
      setKnowledge((prev: number) => Math.max(0, prev - 0.5));
      
      // Здоровье зависит от других параметров
      const averageStats = (hunger + happiness + energy) / 3;
      setHealth(Math.min(100, averageStats));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hunger, happiness, energy]);
  
  // Кормление питомца
  const feedPet = () => {
    setHunger((prev: number) => Math.min(100, prev + 20));
    setEnergy((prev: number) => Math.min(100, prev + 5));
  };
  
  // Игра с питомцем
  const playWithPet = () => {
    setHappiness((prev: number) => Math.min(100, prev + 20));
    setHunger((prev: number) => Math.max(0, prev - 5));
    setEnergy((prev: number) => Math.max(0, prev - 10));
    setKnowledge((prev: number) => Math.min(100, prev + 5));
  };
  
  // Сон питомца
  const sleepPet = () => {
    setEnergy((prev: number) => Math.min(100, prev + 30));
    setHunger((prev: number) => Math.max(0, prev - 5));
  };
  
  // Обучение питомца
  const educatePet = () => {
    setKnowledge((prev: number) => Math.min(100, prev + 15));
    setEnergy((prev: number) => Math.max(0, prev - 5));
    setHappiness((prev: number) => Math.max(0, prev - 3));
    
    // При достаточном обучении можно повысить уровень
    if (knowledge > 95) {
      setLevel((prev: number) => prev + 1);
      setKnowledge(0);
    }
  };
  
  // Определение состояния питомца
  const getPetStatus = () => {
    const average = (hunger + happiness + energy + knowledge) / 4;
    if (average > 70) return "Питомец счастлив!";
    if (average > 40) return "Нормальное состояние";
    return "Питомец несчастлив!";
  };

  // Определение имени следующей эволюции в зависимости от текущего уровня
  const getNextEvolutionName = (): string => {
    switch (level) {
      case 1: return "малыш";
      case 2: return "подросток";
      case 3: return "взрослый";
      case 4: return "мудрец";
      default: return "суперформа";
    }
  };

  // Определение картинки питомца в зависимости от уровня
  const getPetImage = (): string => {
    // Здесь будет логика выбора разных картинок питомца
    // в зависимости от уровня эволюции
    switch (level) {
      case 1:
        return petLevel1Image;
      case 2:
        return petLevel2Image;
      case 3:
        return petLevel3Image;
      case 4:
        return petLevel4Image;
      default:
        return petLevel1Image;
    }
  };

  // Обработчик двойного клика для сброса данных (отладочная функция)
  const handleResetClick = () => {
    if (window.confirm('Сбросить все данные питомца? Питомец начнет с 1 уровня.')) {
      resetPetData();
    }
  };

  return (
    <div className="app">
      <div className="tamagotchi-container">
        <Background backgroundImage={backgroundImage} />
        
        <div className="top-panel-wrapper">
          <TopPanel 
            level={level}
            hunger={Math.round(hunger / 2)} // уменьшенное значение для демонстрации
            health={Math.round(health)}
            energy={Math.round(energy)}
          />
        </div>
        
        <PetContainer
          petImage={getPetImage()}
          status={getPetStatus()}
          knowledge={knowledge}
          nextEvolutionName={getNextEvolutionName()}
          nextEvolutionLevel={level + 1}
          onDoubleClick={handleResetClick}
        />
        
        <div className="action-buttons-wrapper">
          <ActionButtons 
            onFeed={feedPet}
            onPlay={playWithPet}
            onSleep={sleepPet}
            onEducate={educatePet}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
