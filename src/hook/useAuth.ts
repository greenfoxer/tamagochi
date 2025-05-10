import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "./useTelegram";
import { api, User } from "../services/apiService";

export function useAuth() {
    
    const {user: tgUser} = useTelegram();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const login = useCallback(async () =>{
        try {
            setLoading(true);
            console.log('tgUser: ',tgUser);
            if(!tgUser)
                return;
            const response = await api.login(tgUser as WebAppUser);
            console.log('userresponse:',response);
            
            setUser(response.user);

            if(response.user && response.user.telegramId){
                localStorage.setItem('telegramId', response.user.telegramId.toString());
            }
            setError(null);
        } catch (error) {
            setError('Login failed!');
        } finally {
            setLoading(false);
        }
    },[tgUser]);
    useEffect(() => 
        { 
            console.log('Start logging...');
            
            login();
    }, [tgUser]);
    return [user, loading, error]
 }