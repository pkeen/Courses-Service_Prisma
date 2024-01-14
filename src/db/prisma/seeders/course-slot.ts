import { PrismaClient } from "@prisma/client";

interface CourseSlotCreateManyInput {
    courseId: number;
    lessonId?: number | null;
    moduleId?: number | null;
    sequence_order: number;
    createdAt: Date;
    updatedAt: Date;
}

const { getMaxId, getMinId } = require("../utils/getAggregateId.js");
const getRandomId = require("../utils/getRandomId.js");

export default async (prisma: PrismaClient, number: number) => {
    const lessonMin = await getMinId(prisma.lesson);
    const lessonMax = await getMaxId(prisma.lesson);
    const moduleMin = await getMinId(prisma.module);
    const moduleMax = await getMaxId(prisma.module);

    const courseSlots: CourseSlotCreateManyInput[] = [];

    for (let index = 0; index < number; index++) {
        const randomNumber = Math.random();
        const randomCourseId = await getRandomId(prisma.course);

        const courseSlot: CourseSlotCreateManyInput = {
            courseId: randomCourseId || 0,
            lessonId: null,
            moduleId: null,
            sequence_order: Math.floor(Math.random() * 12),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (randomNumber < 0.5) {
            courseSlot.lessonId =
                Math.floor(Math.random() * (lessonMax - lessonMin + 1)) +
                lessonMin;
            courseSlot.moduleId = null;
        } else {
            courseSlot.lessonId = null;
            courseSlot.moduleId =
                Math.floor(Math.random() * (moduleMax - moduleMin + 1)) +
                moduleMin;
        }

        if (!courseSlot.lessonId && !courseSlot.moduleId) {
            continue;
        }

        courseSlots.push(courseSlot);
    }

    await prisma.courseSlot.createMany({ data: courseSlots });
};
