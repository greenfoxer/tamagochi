import { Server } from "@hapi/hapi";
import { Repository, UserWithPet } from "./repository.js";
import { Pet, User } from "@prisma/client";
import { checkLevelUp, educatePet, feedPet, playPet, sleepPet, updatePetStatus } from "./business.js";
import { TelegramUser } from "./types.js";

const repository = new Repository();

export const addBusinessRoutesTo = (server: Server) => {
    addBaseRoute(server);

    addLoginRoute(server);
    addGetPetRoute(server);
    addPetFeedRoute(server);
    addPetPlayRoute(server);
    addPetSleepRoute(server);
    addPetEducateRoute(server)
}
const addPetPlayRoute = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/api/pets/play',
        handler: async (request, h) => {
            const { petId } = request.payload as any;
            const pet : Pet | null =  await repository.getPetByPetId(petId);
            if(pet){
                updatePetStatus(pet);
                playPet(pet);
                checkLevelUp(pet);
                repository.updatePet(pet);
            } else {
                return h.response({
                    message: `Питомец с ID ${petId} не найден!`
                }).code(404);
            }
            return h.response({
                success: true,
                message: "Вы поиграли с питомцем",
                pet: {
                    "id": pet.id,
                    "happiness": 100,
                    "hunger": pet.hunger,
                    "energy": pet.energy,
                    "knowledge": pet.knowledge
                }}).code(200);
        }
    });
}
const addPetSleepRoute = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/api/pets/sleep',
        handler: async (request, h) => {
            const { petId } = request.payload as any;
            const pet : Pet | null =  await repository.getPetByPetId(petId);
            if(pet){
                updatePetStatus(pet);
                sleepPet(pet);
                checkLevelUp(pet);
                repository.updatePet(pet);
            } else {
                return h.response({
                    message: `Питомец с ID ${petId} не найден!`
                }).code(404);
            }
            return h.response({
                success: true,
                message: "Питомец поспал",
                pet: {
                    "id": pet.id,
                    "energy": pet.energy,
                    "hunger": pet.hunger
                }}).code(200);
        }
    });
}
const addPetEducateRoute = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/api/pets/educate',
        handler: async (request, h) => {
            const { petId } = request.payload as any;
            const pet : Pet | null =  await repository.getPetByPetId(petId);
            let isUp = false;
            if(pet){
                updatePetStatus(pet);
                educatePet(pet);
                isUp = checkLevelUp(pet);
                repository.updatePet(pet);
            } else {
                return h.response({
                    message: `Питомец с ID ${petId} не найден!`
                }).code(404);
            }
            return h.response({
                success: true,
                message: "Питомец обучился",
                pet: {
                    "id":  pet.id,
                    "knowledge": pet.knowledge,
                    "energy": pet.energy,
                    "happiness": pet.happiness,
                    "level":  pet.level
                },
                evolved: isUp
            }).code(200);
        }
    });
}
const addPetFeedRoute = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/api/pets/feed',
        handler: async (request, h) => {
            const { petId } = request.payload as any;
            const pet : Pet | null =  await repository.getPetByPetId(petId);
            if(pet){
                updatePetStatus(pet);
                feedPet(pet);
                checkLevelUp(pet);
                repository.updatePet(pet);
            } else {
                return h.response({
                    message: `Питомец с ID ${petId} не найден!`
                }).code(404);
            }
            return h.response({
                success: true,
                message: "Питомец покормлен",
                pet: {
                    "id": pet.id,
                    "hunger": pet.hunger,
                    "energy": pet.energy,
                    "health": pet.health
                }}).code(200);
            }
    });
}
const addGetPetRoute = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/api/pets/my',
        handler: async (request, h) => {
            const  userId : number   = request.query.userId;
            console.log(userId);
            let user : UserWithPet | null= null
            try{
                user = await repository.getUserByIdWithPet(userId.toString());
                if(user && !user.pets) {
                    user = await repository.createPetForNewUser(user) as UserWithPet;
                };
                console.log(user);
            } catch (ex) {
                console.error(ex);
            }
            if(!user) return {
                statusCode: 404,
                message: `Пользователь с ID ${userId} не найден!`
            };
            else return h.response( { success: true, pets: user?.pets}).code(200);
            }
    });
}
const addLoginRoute = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/api/login',
        handler: async (request, h) => {
            console.log(request.payload);
            const { user } = request.payload as { user: TelegramUser};
            console.log(user);
            const userData = await repository.getOrCreateUser(user);
            console.log(userData);
            return h.response( { success: true, user: userData}).code(200);
        }
    });
}
const addBaseRoute = (server: Server) => {
    // Базовый маршрут
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return '<h1>Добро пожаловать на наш сервер!</h1>';
        }
    });
}