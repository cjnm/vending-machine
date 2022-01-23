let express = require('express');
let router = express.Router();

let transactionController = require('../controllers/Transaction');

router.post('/purchase', async (req, res) => {
    let purchaseData = req.body;
    let coin = purchaseData.coin;
    let orders = purchaseData.orders;

    let response = await transactionController.buy(orders, coin);
    res.json(response);
});

router.post('/return', async (req, res) => {
    let purchaseData = req.body;
    let coin = purchaseData.coin;
    let orders = purchaseData.orders;

    let response = await transactionController.return(orders);
    res.json(response);
});

module.exports = router;