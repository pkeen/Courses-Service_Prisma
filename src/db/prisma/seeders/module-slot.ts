import { PrismaClient } from "@prisma/client";
const getRandomId = require("../utils/getRandomId.js");

export default async (prisma: PrismaClient, number: number) => {
    const moduleSlots = [];

    for (let i = 0; i < number; i++) {
        const moduleSlot = {
            moduleId: await getRandomId(prisma.module),
            lessonId: await getRandomId(prisma.lesson),
            sequence_order: Math.floor(Math.random() * 12),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        moduleSlots.push(moduleSlot);
    }

    await prisma.moduleSlot.createMany({ data: moduleSlots });
};
