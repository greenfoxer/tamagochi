export interface TelegramUser{
    id: number,
    username: string,
    first_name: string,
    last_name?: string,
    photo_url?: string,
    language_code?: string,
    is_premium?: boolean,
}