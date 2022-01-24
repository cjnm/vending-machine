let express = require('express');
let router = express.Router();

let { canDispense, canReturn  } = require('../middlewares/middlewares');
let transactionController = require('../controllers/Transaction');

/**
 * Validate and create purchase for products with available inventory 
 * @return  {json}  Returns json containing refund, error, message and products array containing inventory object.
 */
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

/**
 * Validate and create refunds for products purchased from inventory
 * @return  {json}  Returns json containing message, error, refund and products array containing inventory object.
 */
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