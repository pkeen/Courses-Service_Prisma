const { getMinId, getMaxId } = require("./getAggregateId.js");

module.exports = async (model) => {
    const minId = await getMinId(model);
    const maxId = await getMaxId(model);

    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

    return randomId;
};
