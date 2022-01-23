const InventoriesModel = require('../models/Inventories');

exports.getall = async () => {
    return await InventoriesModel.find().then((inventories) => {
        return { status: 200, error: null, inventories: inventories }
    }).catch(e => {
        return { status: 400, error: e, inventories: null }
    });
}