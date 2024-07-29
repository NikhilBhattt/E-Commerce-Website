const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const productModel = require('../models/product-model');

router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');

    res.render('index', { error, success, hide_nav : true });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    const products = await productModel.find();
    let success = req.flash('success');
    res.render('shop', { products, success });
});

router.get('/addcart/:product_id', isLoggedIn, async (req, res) => {

    let user =  await userModel.findOne({ email : req.user.email });
    let product = await productModel.findById(req.params.product_id);

    user.cart.push(product._id);
    await user.save();

    req.flash('success', `'${product.name}' added to Cart.`);
    res.redirect('/shop');
})

router.get('/cart', isLoggedIn, async (req, res) => {
    let user =  await userModel
      .findOne({ email : req.user.email })
      .populate('cart');

    res.render('cart', { user });
})

module.exports = router;