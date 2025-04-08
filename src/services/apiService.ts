const API_URL = import.meta.env.VITE_API_URL;

export interface User {
    telegramId: number,
    username: string,
    first_name: string,
    last_name?: string,
    photo_url?: string,
    language_code?: string,
    is_premium?: boolean,
}

export interface Pet {
    id: string;
    name: string;
    level: number;
    hunger: number;
    happiness: number;
    energy: number;
    health: number;
    knowledge: number;
}

export interface ApiResponse<T>{
    success: true;
    message?: string;
    error?: string;
    data?: T;
}

class ApiService{
    private async request<T>(endpoint: string, options: RequestInit = {}) : Promise<T>{
        const url = `${API_URL}${endpoint}`;
        const headers = {
            'Content-Type' : 'application/json',
            ...options.headers
        };
        const config = {        
            mode: 'cors' as RequestMode,
            headers,
            ...options,
        };
        try {
            console.log('request', config, url);
            const response = await fetch(url, config);
            const data = await response.json();
            console.log('response', data);
            
            if(!response.ok){
                throw new Error(data.Error || 'Ошибка запроса к API');
            }

            return data;
        } catch (error) {
            console.log('API ERRORS:', error);
            throw error;
        }
    }
    async login(user: WebAppUser){
        return this.request<{success: boolean; user: User}>('/api/login',{
            method: 'POST',
            body: JSON.stringify({user})
        });
    }
    async getUser(telegramId : string){
        return this.request<{success: boolean, user: User}>(`/api/user?telegramId=${telegramId}`);
    }
    async getPet(userId : string){
        return this.request<{success: boolean, user: User}>(`/api/pets/my?userId=${userId}`);
    }
    async feedPet(petId : string){
        return this.request<{success: boolean, message: string, pets: Partial<Pet>}>('/api/pets/feed',{
            method: 'POST',
            body: JSON.stringify({petId})
        });
    }
    async sleepPet(petId : string){
        return this.request<{success: boolean, message: string, pets: Partial<Pet>}>('/api/pets/sleep',{
            method: 'POST',
            body: JSON.stringify({petId})
        });
    }
    async playPet(petId : string){
        return this.request<{success: boolean, message: string, pets: Partial<Pet>}>('/api/pets/play',{
            method: 'POST',
            body: JSON.stringify({petId})
        });
    }
    async educatePet(petId : string){
        return this.request<{success: boolean, message: string, pets: Partial<Pet>}>('/api/pets/educate',{
            method: 'POST',
            body: JSON.stringify({petId})
        });
    }
}

export const api = new ApiService();