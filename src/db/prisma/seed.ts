import { p } from "./client";
import seedusers from "./seeders/users";
import seedcourses from "./seeders/courses";

const main = async () => {
    await seedusers(p, 5);
    await seedcourses(p, 10);
};

main()
    .then(async () => {
        await p.$disconnect();
        console.log("Db disconnected");
    })
    .catch(async (e) => {
        console.error(e);
        await p.$disconnect();
        process.exit(1);
    });

export default main;
