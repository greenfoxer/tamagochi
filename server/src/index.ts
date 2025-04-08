import { VercelRequest, VercelResponse } from '@vercel/node'
import { createServer } from './serverInit.js';
import { allowCors } from './middleware/allowCors.js';

const handler = async(req: VercelRequest, response: VercelResponse) =>{
    try {
        const hapiServer = await createServer();
        const hapiResponse = await hapiServer.inject({
            method: req.method as any,
            url: req.url!,
            headers: req.headers,
            payload: req.body
        });
        console.log('Server try to start!');
        
        response.status(hapiResponse.statusCode).send(hapiResponse.payload);
    } catch (error) {
        console.log("Ошибка обработки запроса: ", error);
        response.status(500).json({
            error: "Ошибка обработки запроса"
        });
    }
}

export default handler;