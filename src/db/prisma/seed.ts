import prisma from "./client";
import seedusers from "./seeders/users";
import seedcourses from "./seeders/courses";
import seedmodules from "./seeders/module";
import seedlesson from "./seeders/lesson";
import seedcourseslot from "./seeders/course-slot";
import seedModuleSlot from "./seeders/module-slot";

const main = async () => {
    // count users
    const userCount = await prisma.user.count();
    console.log("user count", userCount);
    if (userCount < 40) {
        await seedusers(prisma, 5);
    }

    // count courses
    const courseCount = await prisma.course.count();
    console.log("Course Count:", courseCount);
    if (courseCount < 50) {
        await seedcourses(prisma, 10);
    }

    // module
    const moduleCount = await prisma.module.count();
    console.log("Module Count: ", moduleCount);
    if (moduleCount < 80) {
        await seedmodules(prisma, 20);
    }

    // lesson
    const lessonCount = await prisma.lesson.count();
    console.log("lesson count:", lessonCount);
    if (lessonCount < 120) {
        await seedlesson(prisma, 30);
    }

    // course slot
    const courseSlotCount = await prisma.courseSlot.count();
    console.log("course slot count:", courseSlotCount);
    if (courseSlotCount < 150) {
        await seedcourseslot(prisma, 50);
    }

    // Module Slot Seed
    const moduleSlotCount = await prisma.moduleSlot.count();
    console.log("Module Slot count:", moduleSlotCount);
    if (moduleSlotCount < 150) {
        await seedModuleSlot(prisma, 50);
    }

};

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Db disconnected");
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

export default main;
