let express = require('express');
let router = express.Router();

let middlewares = require('../middlewares/middlewares');
let transactionController = require('../controllers/Transaction');

router.post('/purchase',middlewares.checkInventoryAndCoinAvailibility, async (req, res) => {
    let purchaseData = req.body;
    let coin = purchaseData.coin;
    let products = purchaseData.products;

    let response = await transactionController.buy(products, coin);
    if (response.error) {
        res.status(400).json(response);
    } else {
        res.status(200).json(response);
    }
});

router.post('/return', async (req, res) => {
    let products = req.body.products;

    let response = await transactionController.return(products);
    if (response.error) {
        res.status(400).json(response);
    } else {
        res.status(200).json(response);
    }
});

module.exports = router;