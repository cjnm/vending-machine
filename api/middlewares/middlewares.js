const InventoriesModel = require('../models/Inventories');
const MoneyModel = require('../models/Money');

exports.checkInventoryAndCoinAvailibility = async (req, res, next) => {
  if (! await isDatabaseSeeded()) {
    let response = { error: true, message: 'The vending machine is out of order.', products: null, refund: req.body.coin };
    res.status(400).json(response);
  } else {
    next();
  }
}

/**
 * this is a test function created just to check if database is seeded, not to be used in production
 * @TODO: remove after testing
 */
async function isDatabaseSeeded() {
  let itemsCount = await InventoriesModel.countDocuments({}).exec();
  let moneyCount = await MoneyModel.countDocuments({}).exec();
  if (0 == moneyCount || 0 == itemsCount) {
    return false;
  }
  return true;
}