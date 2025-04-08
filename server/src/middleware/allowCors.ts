import { VercelRequest, VercelResponse } from "@vercel/node";

type VercelHandler = ( request: VercelRequest, response: VercelResponse) => Promise<void> | void;

export const allowCors = (fn: VercelHandler) => async (request: VercelRequest, response: VercelResponse) => {
    console.log(request.headers);
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, '+
        'Content-Type, content-type, accept-encoding, accept-language, Date, X-Api-Version, telegram-data, x-client-version'
    );

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    return await fn(request, response);
}
