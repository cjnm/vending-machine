let express = require('express');
let router = express.Router();

let inventoryController = require('../controllers/Inventory');

/**
 * Returns the current inventory available in database.
 * @return  {json}  Returns json containing status, error, and inventories array containing inventory object.
 */
router.get('/inventory', async (req, res, next) => {
    let response = await inventoryController.getall();
    res.json(response);
});

module.exports = router;
