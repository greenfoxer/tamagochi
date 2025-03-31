import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "./useTelegram";

export const useTelegramBackButton=() =>{
    const {webApp} = useTelegram();
    const navigate = useNavigate();
    const location = useLocation();
    const handleBackButton = () => {
        if(location.pathname !== '/'){
            navigate(-1);
        }
    }
    useEffect(() =>{
        if(!webApp)
            return;
        if(location.pathname !== '/'){
            webApp.BackButton.show();
            webApp.onEvent('backButtonClicked', handleBackButton);
        } else {
            webApp.BackButton.hide();
        }

        return () =>{
            webApp.offEvent('backButtonClicked', handleBackButton);
            webApp.BackButton.hide();
        }
    }, [location.pathname, navigate]);
}