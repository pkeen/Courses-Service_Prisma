import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export default async (prisma: PrismaClient, number: number) => {
    const modules = [];

    for (let i = 0; i < number; i++) {
        const module = {
            title: faker.company.buzzPhrase(),
            text: faker.lorem.sentences(),
            isPublished: faker.datatype.boolean(0.7),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        modules.push(module);
    }

    await prisma.module.createMany({ data: modules });
};
