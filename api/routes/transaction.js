let express = require('express');
let router = express.Router();

let { canDispense, canReturn  } = require('../middlewares/middlewares');
let transactionController = require('../controllers/Transaction');

router.post('/purchase', canDispense, async (req, res) => {
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

router.post('/return', canReturn, async (req, res) => {
    let products = req.body.products;

    let response = await transactionController.return(products);
    if (response.error) {
        res.status(400).json(response);
    } else {
        res.status(200).json(response);
    }
});

module.exports = router;