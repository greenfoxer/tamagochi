import { Pet } from "@prisma/client";

export const feedPet = (pet : Pet) => {
    pet.hunger += 20 + pet.feedBonus;
    if(pet.hunger > 100)
        pet.hunger = 100;
    pet.energy += 5;
    pet.lastFeed = new Date();
}
export const playPet = (pet : Pet) => {
    pet.happiness += 20 + pet.happyBonus;
    if(pet.happiness > 100)
        pet.happiness = 100;
    pet.knowledge += 5;
    pet.energy--;
    pet.hunger--;
    pet.lastPlay = new Date();
}
export const sleepPet = (pet : Pet) => {
    pet.hunger -= 5;
    pet.energy = 100;
    pet.lastSleep = new Date();
}
export const educatePet = (pet : Pet) => {
    pet.knowledge += 15;
    pet.happiness--;
    pet.energy--;
    pet.lastEducate = new Date();
}

export const checkLevelUp = (pet : Pet) => {
    if(pet.level < 10 && pet.knowledge > 95){
        pet.level++;
        pet.knowledge = 0;
        return true;
    }
    return false;
}


export const updatePetStatus = (pet : Pet) => {
    const now = new Date();
    
    // Обновление голода
    if (pet.lastFeed) {
      const hoursSinceLastFeed = (now.getTime() - new Date(pet.lastFeed).getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastFeed >= 1) {
        const hungerDecrease = Math.floor(hoursSinceLastFeed * 5);
        pet.hunger = Math.max(0, pet.hunger - hungerDecrease);
      }
    }
    
    // Обновление счастья
    if (pet.lastPlay) {
      const hoursSinceLastPlay = (now.getTime() - new Date(pet.lastPlay).getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastPlay >= 1) {
        const happinessDecrease = Math.floor(hoursSinceLastPlay * 3);
        pet.happiness = Math.max(0, pet.happiness - happinessDecrease);
      }
    }
    
    // Обновление энергии
    if (pet.lastSleep) {
      const hoursSinceLastSleep = (now.getTime() - new Date(pet.lastSleep).getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastSleep >= 1) {
        const energyDecrease = Math.floor(hoursSinceLastSleep * 2);
        pet.energy = Math.max(0, pet.energy - energyDecrease);
      }
    }
    
    // Обновление знаний
    if (pet.lastEducate) {
      const hoursSinceLastEducate = (now.getTime() - new Date(pet.lastEducate).getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastEducate >= 1) {
        const knowledgeDecrease = Math.floor(hoursSinceLastEducate * 1);
        pet.knowledge = Math.max(0, pet.knowledge - knowledgeDecrease);
      }
    }
    
    // Обновление здоровья на основе других показателей
    const averageStats = (pet.hunger + pet.happiness + pet.energy) / 3;
    pet.health = Math.min(100, averageStats);
    
    return pet;
  }

  /**
 * Получение текущего состояния питомца (настроение)
 * @param {Object} pet - Объект питомца
 * @returns {string} - Состояние питомца (happy, normal, sad)
 */
function getPetMood(pet : Pet) {
  const average = (pet.hunger + pet.happiness + pet.energy + pet.health) / 4;
  
  if (average > 70) return 'happy';
  if (average > 40) return 'normal';
  return 'sad';
}

/**
 * Генерирует сообщение о том, что нужно питомцу
 * @param {Object} pet - Объект питомца
 * @returns {string|null} - Сообщение или null, если всё в порядке
 */
function getPetNeedsMessage(pet : Pet) {
  if (pet.hunger < 20) {
    return 'Питомец голоден! Покормите его.';
  }
  
  if (pet.happiness < 20) {
    return 'Питомец грустит! Поиграйте с ним.';
  }
  
  if (pet.energy < 20) {
    return 'Питомец устал! Пусть отдохнет.';
  }
  
  if (pet.health < 30) {
    return 'Питомец плохо себя чувствует! Позаботьтесь о нем.';
  }
  
  return null;
}

/**
 * Возвращает название следующей эволюции питомца
 * @param {number} currentLevel - Текущий уровень питомца
 * @returns {string} - Название следующей эволюции
 */
function getNextEvolutionName(currentLevel : number) {
  switch (currentLevel) {
    case 1: return 'Малыш';
    case 2: return 'Подросток';
    case 3: return 'Взрослый';
    case 4: return 'Мудрец';
    default: return 'Суперформа';
  }
}