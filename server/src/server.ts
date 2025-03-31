import { createServer } from "./serverInit.js";
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  const server = await createServer();
  await server.start();
  console.log("Локальный сервер запущен на %s", server.info.uri);  
}

init();