import { createServer } from "./serverInit.js";

const init = async () => {
  const server = await createServer();
  await server.start();
  console.log("Локальный сервер запущен на %s", server.info.uri);  
}

init();