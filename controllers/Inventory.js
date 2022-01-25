const InventoriesModel = require('../models/Inventories');

/**
 * Fetches adnd returns all the available inventory in database.
 *
 * @return  {json}  Returns json containing status, error, and inventories array containing inventory object.
 */
exports.getall = async () => {
    return await InventoriesModel.find().select('-_id name price quantity').then((inventories) => {
        return { status: 200, error: null, inventories: inventories }
    }).catch(e => {
        return { status: 400, error: e, inventories: null }
    });
}