import { useEffect, useState } from "react"

export const useTelegram = () => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);
    const [isTelegram, setIsTelegram] = useState<boolean>(false);
    const [user, setUser] = useState<WebAppUser | null>(null);
    useEffect(() =>{
        const tg = window.Telegram.WebApp;

        if (tg) {
            setWebApp(tg);
            const isValidTelegramData = tg 
                                        && tg.initDataUnsafe 
                                        && Object.keys(tg.initDataUnsafe).length > 0
                                        && tg.initDataUnsafe.user;
            if(isValidTelegramData){
                setIsTelegram(true);
                setUser(tg.initDataUnsafe.user!);
            } else {
                setUser({
                    id:12345,
                    username: 'testuser',
                    first_name: 'Test',
                    last_name: "testov",
                    photo_url: "",
                    language_code: "ru",
                    is_premium: true,
                });
                setIsTelegram(false);
            }
        } else {
            setWebApp(null);
        }
    }, []);

    return {user, isTelegram, webApp};
}