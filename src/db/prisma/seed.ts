import { p } from "./client";
import seedusers from "./seeders/users";
import seedcourses from "./seeders/courses";
import seedmodules from "./seeders/module";
import seedlesson from "./seeders/lesson";
import seedcourseslot from "./seeders/course-slot";
import seedModuleSlot from "./seeders/module-slot";

const main = async () => {
    // count users
    const userCount = await p.user.count();
    console.log("user count", userCount);
    if (userCount < 40) {
        await seedusers(p, 5);
    }

    // count courses
    const courseCount = await p.course.count();
    console.log("Course Count:", courseCount);
    if (courseCount < 50) {
        await seedcourses(p, 10);
    }

    // module
    const moduleCount = await p.module.count();
    console.log("Module Count: ", moduleCount);
    if (moduleCount < 80) {
        await seedmodules(p, 20);
    }

    // lesson
    const lessonCount = await p.lesson.count();
    console.log("lesson count:", lessonCount);
    if (lessonCount < 120) {
        await seedlesson(p, 30);
    }

    // course slot
    const courseSlotCount = await p.courseSlot.count();
    console.log("course slot count:", courseSlotCount);
    if (courseSlotCount < 150) {
        await seedcourseslot(p, 50);
    }

    // Module Slot Seed
    const moduleSlotCount = await p.moduleSlot.count();
    console.log("Module Slot count:", moduleSlotCount);
    if (moduleSlotCount < 150) {
        await seedModuleSlot(p, 50);
    }

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
