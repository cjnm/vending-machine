module.exports.canDispense = async (req, res, next) => {
  let data = req.body;
  let products = data.products;
  let coin = data.coin;
  if (!Array.isArray(products) || !coin) {
    let response = { error: true, message: 'Invalid argument supplied for order.', products: null, refund: coin || null };
    res.status(400).json(response);
  } else {
    next();
  }
}

module.exports.canReturn = async (req, res, next) => {
  let data = req.body;
  let products = data.products;
  if (!Array.isArray(products)) {
    let response = { error: true, message: 'Invalid argument supplied for return.', products: products, refund: null };
    res.status(400).json(response);
  } else {
    next();
  }
}