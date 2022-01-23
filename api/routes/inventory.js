let express = require('express');
let router = express.Router();

let inventoryController = require('../controllers/Inventory');

router.get('/inventory', async (req, res, next) => {
    let response = await inventoryController.getall();
    res.json(response);
});

module.exports = router;
