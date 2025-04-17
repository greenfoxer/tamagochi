import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { api, Pet, User } from '../services/apiService';

const usePet = () => {
  const [user] = useAuth(); 
  const [pet, setPet] = useState<Pet | null>(null);

  function updatePet() {
    if(!user)
        return;
    api.getPet((user as User).telegramId.toString()).then((data) =>{
        setPet(data.pets);
    });
  };
  useEffect(() => {
    const update = async () => {
        await updatePet();
    };
    update();
  }, [user]);
  return [pet, updatePet];
}

export default usePet