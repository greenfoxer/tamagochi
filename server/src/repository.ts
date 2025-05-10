import { Pet, PrismaClient, User } from "@prisma/client";

export interface UserWithPet extends User{
    pets : Pet
}

export class Repository {
    prisma : PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    getPetByPetId = async (petId : string) => {
        const petData = await this.prisma.pet.findUnique({
            where:{
                id : petId.toString(),
            }
        })
        return petData;
    }
    updatePet = async (pet: Pet) => {
        const res = await this.prisma.pet.update({
            where: {
                id: pet.id
            },
            data:{
                updatedAt: new Date(),
                hunger: pet.hunger,
                energy: pet.energy,
                happiness: pet.happiness,
                knowledge: pet.knowledge,
                level: pet.level,
                lastPlay: pet.lastPlay,
                lastFeed: pet.lastFeed,
                lastEducate: pet.lastEducate,
                lastSleep: pet.lastSleep
            }
        });
    }
    getOrCreateUser = async ( user : any) =>{
        const userData = await this.prisma.user.upsert({
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
        });
        return userData;
    }
    getUserByIdWithPet = async (id : string) =>{
        const user = await this.prisma.user.findFirst({
            where: {
                telegram_id: id
            },
            include: {
                pets: true
            }
        });
        return user as UserWithPet;
    }
    createPetForNewUser = async (user: UserWithPet) => {
        user = await this.prisma.user.update({
            where: {
                telegram_id: user.telegram_id
            },
            data:{
                pets: {
                    create:{
                        createdAt: new Date()
                    }
                }
            },
            include: {
                pets: true
            },
        }) as UserWithPet;
        return user;
    }
}
