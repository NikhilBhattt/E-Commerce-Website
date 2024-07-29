const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');

// route only for Development Phase
if (process.env.NODE_ENV === 'development') {
    router.get('/create', (req, res) => {
        res.render('owner-login', { hide_nav : true });
    });

    router.post('/create', async (req, res) => {
        try{
            let { fullname, email, password } = req.body;
            let admin = await ownerModel.create({ fullname, email, password });
            res.redirect('/admin/');
        } catch(err) {
            res.status(500).send(err.message);
        }
    });
}

router.get('/', async (req, res) => {
    const products = await productModel.find();
    res.render('admin', { products, hide_nav : true });
});

router.get('/add-product', (req, res) => {
    let success = req.flash('success');
    res.render('createproducts', {success, hide_nav : true});
});

module.exports = router;