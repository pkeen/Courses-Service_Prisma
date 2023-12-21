import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const userseed = async (prisma: PrismaClient, number: number) => {
    // create the table
    const users = [];
    for (let i = 0; i < number; i++) {
        let user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        users.push(user);
    }

    await prisma.user.createMany({
        data: users,
    });
};

export default userseed;
