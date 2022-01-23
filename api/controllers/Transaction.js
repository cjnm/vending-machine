const InventoriesModel = require('../models/Inventories');
const MoneyModel = require('../models/Money');

exports.buy = async (orders, coin) => {
    if (!Array.isArray(orders)) {
        return { status: 400, error: 'Invalid argument supplied for purchase.', products: null, refund: coin };
    }

    if (!await areProductsAvailable(orders)) {
        return { status: 400, error: 'Supplied products does not exist in inventory.', products: null, refund: coin };
    }

    let cost = await calculateCost(orders);
    let refundAmount = coin - cost;

    if (refundAmount < 0) {
        return { status: 400, error: 'Insufficient coin insetred.', products: null, refund: coin };
    }

    if (!await isInventoryAvailable(orders)) {
        return { status: 400, error: 'Insufficient inventory available.', products: null, refund: coin };
    }

    // Initializing purchase.
    await updateInventory(orders);
    await updateMoney(cost);
    return { status: 200, error: null, products: orders, refund: refundAmount };
}

exports.return = async (orders) => {
    if (!Array.isArray(orders)) {
        return { status: 400, error: 'Invalid argument supplied for return.', products: null, refund: null };
    }

    if (!await areProductsAvailable(orders)) {
        return { status: 400, error: 'Supplied products was not sold from this vending machine.', products: orders, refund: null };
    }

    if (!await isInventoryRefundable(orders)) {
        return { status: 400, error: 'Cannot return more products than total sold', products: orders, refund: null };
    }

    let refundAmount = await calculateCost(orders);

    // Initializing purchase.
    await updateInventory(orders, true);
    await updateMoney(-refundAmount);
    return { status: 200, error: null, products: null, refund: refundAmount };

}

async function updateInventory(orders, refund = false) {
    let newInventory = 0;
    orders.forEach(async (order) => {
        InventoriesModel.findOne({ name: order.item }, async (item) => {
            newInventory = refund ? item.quantity + order.quantity : item.quantity - order.quantity;
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

async function isInventoryRefundable(orders) {
    let refundable = true;
    orders.forEach(async (order) => {
        await InventoriesModel.findOne({ name: order.item }, function (inventory) {
            if ((10 - inventory.quantity) < order.quantity) {
                refundable = false;
            }
        });
    });
    return refundable;
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