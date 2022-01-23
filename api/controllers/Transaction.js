const InventoriesModel = require('../models/Inventories');
const MoneyModel = require('../models/Money');

exports.buy = async (orders, coin) => {
    if (!Array.isArray(orders)) {
        return { status: 400, error: 'Invalid argument supplied for purchase.', purchase: null, refund: coin };
    }

    if (!await areProductsAvailable(orders)) {
        return { status: 400, error: 'Supplied products does not exist in inventory.', purchase: null, refund: coin };
    }

    let cost = await calculateCost(orders);
    let refundAmount = coin - cost;

    if (refundAmount < 0) {
        return { status: 400, error: 'Insufficient coin insetred.', purchase: null, refund: coin };
    }

    if (!await isInventoryAvailable(orders)) {
        return { status: 400, error: 'Insufficient inventory available.', purchase: null, refund: coin };
    }

    // Initializing purchase.
    await updateInventory(orders);
    await updateMoney(cost);
    return { status: 200, error: null, purchase: orders, refund: refundAmount };
}

exports.return = async (orders) => {
    //To be implemented
}

async function updateInventory(orders) {
    let newInventory = 0;
    orders.forEach(async (order) => {
        InventoriesModel.findOne({ name: order.item }, async (item) => {
            newInventory = item.quantity;
            await InventoriesModel.findOneAndUpdate({ _id: item._id }, { quantity: newInventory });
        });
    });
    return;
}

async function updateMoney(coin) {
    let money = await MoneyModel.findOne({}).exec();
    let newCoin = money.coin + coin;
    await MoneyModel.findOneAndUpdate({ _id: money._id }, { coin: newCoin });
    return;
}

async function calculateCost(orders) {
    let cost;
    orders.forEach((order) => {
        cost += order.price;
    });
    return cost;
}

async function isInventoryAvailable(orders) {
    let availibility = true;
    orders.forEach(async (order) => {
        await InventoriesModel.findOne({ name: order.item }, function (inventory) {
            if (inventory.quantity < order.quantity) {
                availibility = false;
            }
        });
    });
    return availibility;
}

async function areProductsAvailable(orders) {
    let availibility = true;
    orders.forEach(async (order) => {
        await InventoriesModel.countDocuments({ name: order.item }, function (count) {
            if (count <= 0) {
                availibility = false;
            }
        });
    });
    return availibility;
} 