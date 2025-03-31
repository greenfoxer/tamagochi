import Hapi from '@hapi/hapi';
import TelegramBot from 'node-telegram-bot-api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Проверка наличия токена
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN не установлен в .env файле');
  process.exit(1);
}

// Инициализация Telegram бота в режиме long polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Обработчик сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  console.log('Получено сообщение:', msg);
  await bot.sendMessage(chatId, `Эхо: ${text}`);
});

bot.onText(/\/start/, async (msg) =>{
  await bot .sendMessage(msg.chat.id, 'Hello!', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Запустить игру', web_app: {
            url: 'https://roman-tamagochi-test.loca.lt/'
          }
        }]
      ]
    }
  });
});

// Запуск сервера
// const init = async () => {
//   try {

//   } catch (err) {
//     console.error('Ошибка при запуске/работе сервера:', err);
//     process.exit(1);
//   }
// };
export const createServer = async () =>{
    // Создание Hapi сервера
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
        cors: {
            origin: ['*'],
            credentials: true,
            additionalExposedHeaders: ['content-encoding'],
            exposedHeaders: ['content-encoding'],
            additionalHeaders: ['telegram-data']
        }
        }
    });

    // Базовый маршрут
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
        return '<h1>Добро пожаловать на наш сервер!</h1>';
        }
    });
    
    // Healthcheck
    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
        return { 
            status: 'ok',
            message: 'Сервер работает корректно '
        };
        }
    });
    
    server.route({
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
        // @ts-ignore
        const { user } = request.payload;
        console.log(user);
        const userData = await prisma.user.upsert({
            where:{
            telegram_id: user.id.toString(),
            },
            update: {
            last_active: new Date(),
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            photo_url: user.photo_url,
            language: user.language || 'ru',
            is_premium: user.is_premium
            },
            create: {
            telegram_id: user.id.toString(),
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            photo_url: user.photo_url,
            language: user.language || 'ru',
            is_premium: user.is_premium
            }
        })
        console.log(userData);
        return userData;
        }
    });
    
    server.route({
        method: 'GET',
        path: '/api/pets/my',
        handler: async (request, h) => {
        // @ts-ignore
        const { user } = request.payload;
        console.log(user);
        const userData = await prisma.user.upsert({
            where:{
            telegram_id: user.id.toString(),
            },
            update: {
            last_active: new Date(),
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            photo_url: user.photo_url,
            language: user.language || 'ru',
            is_premium: user.is_premium
            },
            create: {
            telegram_id: user.id.toString(),
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            photo_url: user.photo_url,
            language: user.language || 'ru',
            is_premium: user.is_premium
            }
        })
        console.log(userData);
        return userData;
        }
    });
    
    server.route({
        method: 'GET',
        path: '/send/message',
        handler: async () => {
        await bot.sendMessage(236816352, `Echo: ${Math.random()}`);
    
        return {
            status: 'ok',
            message: 'Message sent!'
        }
        }
    })
    await server.initialize();
    return server;
}