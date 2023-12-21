import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export default async (prisma: PrismaClient, number: number) => {
    const courses = [];
    for (let i = 0; i < number; i++) {
        const randomUser = await prisma.user.findFirst({
            orderBy: {
                id: "asc", // This is just a placeholder; the actual ordering is done by the random function
            },
            take: 1,
            cursor: {
                id: Math.floor(Math.random() * (await prisma.user.count()) + 1),
            },
        });

        if (!randomUser) {
            continue; // Skip this iteration if no user is found
        }

        let course = {
            userId: randomUser.id,
            title: faker.company.buzzPhrase(),
            description: faker.lorem.sentences(),
            isPublished: faker.datatype.boolean(0.7),
            isCurated: faker.datatype.boolean(0.3),
            price: Math.random() < 0.5 ? 0 : faker.commerce.price({ max: 200 }),
        };
        courses.push(course);
    }
    await prisma.course.createMany({ data: courses });
};
