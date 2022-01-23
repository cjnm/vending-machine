const InventoriesModel = require('../models/Inventories');
const MoneyModel = require('../models/Money');

exports.buy = async (products, coin) => {
    if (!Array.isArray(products)) {
        return { error: true, message: 'Invalid argument supplied for purchase.', products: null, refund: coin };
    }

    if (!await areProductsAvailable(products)) {
        return { error: true, message: 'Supplied products does not exist in inventory.', products: null, refund: coin };
    }

    let cost = await calculateCost(products);
    let refundAmount = coin - cost;

    if (refundAmount < 0) {
        return { error: true, message: 'Insufficient coin insetred.', products: null, refund: coin };
    }

    if (!await isInventoryAvailable(products)) {
        return { error: true, message: 'Insufficient inventory available.', products: null, refund: coin };
    }

    // Initializing purchase.
    await updateInventory(products);
    await updateMoney(cost);
    return { error: false, message: null, products: products, refund: refundAmount };
}

exports.return = async (products) => {
    if (!Array.isArray(products)) {
        return { error: true, message: 'Invalid argument supplied for return.', products: null, refund: null };
    }

    if (!await areProductsAvailable(products)) {
        return { error: true, message: 'Supplied products was not sold from this vending machine.', products: products, refund: null };
    }

    if (!await isInventoryRefundable(products)) {
        return { error: true, message: 'Cannot return more products than total sold', products: products, refund: null };
    }

    let refundAmount = await calculateCost(products);

    // Initializing purchase.
    await updateInventory(products, true);
    await updateMoney(-refundAmount);
    return { error: false, message: null, products: null, refund: refundAmount };

}

async function updateInventory(products, refund = false) {
    let newInventory = 0;
    for (const product of products) {
        let item = await InventoriesModel.findOne({ name: product.item }).exec();
        newInventory = refund ? item.quantity + product.quantity : item.quantity - product.quantity;
        await InventoriesModel.findOneAndUpdate({ _id: item._id }, { quantity: newInventory });
    }
    return;
}

async function updateMoney(coin) {
    let money = await MoneyModel.findOne({}).exec();
    let newCoin = money.coin + coin;
    await MoneyModel.findOneAndUpdate({ _id: money._id }, { coin: newCoin });
    return;
}

async function calculateCost(products) {
    let cost = 0;
    for (const product of products) {
        let item = await InventoriesModel.findOne({ name: product.item }).exec();
        cost = cost + (item.price * product.quantity);
    }
    return cost;
}

async function isInventoryAvailable(products) {
    let availibility = true;
    for (const product of products) {
        let inventory = await InventoriesModel.findOne({ name: product.item }).exec();
        if (inventory.quantity < product.quantity) {
            availibility = false;
        }
    };
    return availibility;
}

async function isInventoryRefundable(products) {
    let refundable = true;
    for (const product of products) {
        let inventory = await InventoriesModel.findOne({ name: product.item }).exec();
        if ((10 - inventory.quantity) < product.quantity) {
            refundable = false;
        }
    }
    return refundable;
}

async function areProductsAvailable(products) {
    let availibility = true;
    for (const product of products) {
        let count = await InventoriesModel.countDocuments({ name: product.item }).exec();
        if (!count) {
            return false;
        }
        if (count <= 0) {
            availibility = false;
        }
    }
    return availibility;
} 