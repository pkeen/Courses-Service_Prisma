import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const { getMaxId, getMinId } = require("../utils/getAggregateId");

export default async (prisma: PrismaClient, number: number) => {
    const lessons = [];

    const maxId = await getMaxId(prisma.user);
    console.log("user max:", maxId);
    const minId = await getMinId(prisma.user);
    console.log("User Min: ", minId);

    for (let i = 0; i < number; i++) {
        const lesson = {
            userId: Math.floor(Math.random() * (maxId - minId + 1)) + minId,
            title: faker.company.buzzPhrase(),
            text: faker.lorem.sentences(),
            isPublished: faker.datatype.boolean(0.7),
            isFree: faker.datatype.boolean(0.3),
            videoUrl: faker.internet.url(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        lessons.push(lesson);
    }

    await prisma.lesson.createMany({ data: lessons });
};
