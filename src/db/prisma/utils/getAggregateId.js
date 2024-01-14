// Define the function
const getMaxId = async (model) => {
    const maxId = await model.aggregate({
        _max: {
            id: true,
        },
    });
    return maxId._max.id;
};

const getMinId = async (model) => {
    const minId = await model.aggregate({
        _min: {
            id: true,
        },
    });

    return minId._min.id;
};

module.exports = { getMaxId, getMinId };
