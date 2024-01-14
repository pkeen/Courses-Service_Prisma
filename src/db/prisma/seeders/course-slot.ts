import { PrismaClient } from "@prisma/client";
const { getMaxId, getMinId } = require("../utils/getAggregateId.js");

export default async (prisma: PrismaClient, number: number) => {
    const courseSlots: Array<{
        courseId?: number;
        lessonId?: number;
        moduleId?: number;
        sequence_order: number;
        createdAt: Date;
        updatedAt: Date;
    }> = [];

    const courseMin = getMinId(prisma.course);
    const courseMax = getMaxId(prisma.course);
    const lessonMin = getMinId(prisma.lesson);
    const lessonMax = getMaxId(prisma.lesson);
    const moduleMin = getMinId(prisma.module);
    const moduleMax = getMaxId(prisma.module);

    for (let index = 0; index < number; index++) {
        const randomNumber = Math.random();

        const courseSlot = {
            courseId:
                Math.floor(Math.random() * (courseMax - courseMin + 1)) +
                courseMin,
            lessonId: null,
            moduleId: null,
            sequence_order: Math.floor(Math.random() * 12),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (randomNumber < 0.5) {
            courseSlot.lessonId = Math.floor(Math.random() * (lessonMax - lessonMin + 1)) +
                    lessonMin,
        } else {
            courseSlot.moduleId =  Math.floor(Math.random() * (moduleMax - moduleMin + 1)) +
                    moduleMin,
        }

        courseSlots.push(courseSlot);
    }

    await prisma.courseSlot.createMany({ data: courseSlots });
};
