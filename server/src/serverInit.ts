import Hapi from '@hapi/hapi';
import  { Update } from 'node-telegram-bot-api';
import { addBusinessRoutesTo } from './registerServerRoutes.js';
import { bot } from './bot.js';

const WEBHOOK_URL = `${process.env.WEBHOOK_URL}/webhook`;

async function ensureWebhook(){
  try {
      const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`);
      const data  = await response.json();
      console.log(WEBHOOK_URL, data);
      if(data.result.url !== WEBHOOK_URL){
          console.log("Webhook не установлен. Попытка еще..");
          await bot.setWebHook(WEBHOOK_URL);
      } else {
          console.log(`Webhook уже установлен по адресу ${data.result.url}`);
      }
  } catch (error) {
      console.error("Ошибка установки webhook");
  }
}
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
  });
  // Healthcheck
  server.route({
      method: 'GET',
      path: '/health',
      handler: async (request, h) => {
        await bot.sendMessage(236816352,'Сервер работает корректно!');
        return { 
          status: 'ok',
          message: 'Сервер работает корректно '
      };
      }
  });

  server.route({
      method: 'POST',
      path: '/webhook',
      handler: async (request, h) => {
          const data = request.payload;
          console.log("Получены данные: ", data);
          await bot.processUpdate(request.payload as Update);
          return h.response({success: true}).code(200);
      }
  });

  addBusinessRoutesTo(server);
  
  await server.initialize();

  await ensureWebhook();
  return server;
}