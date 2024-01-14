import prisma from "../../db/prisma/client";

export const index = async (req: any, res: any) => {
    // const params = req.query;
    // const query = validateAndFormatParams(Course, params);
    try {
        const courses = await prisma.course.findMany({
            orderBy: {
                id: "asc",
            },
        });
        console.log(courses);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error });
    }
};
