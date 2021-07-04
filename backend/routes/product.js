const router = require('express').Router();
let Product = require('../model/product.model');

// Get all products
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add product
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productQuantity = Number(req.body.productQuantity);
    const date = Date.parse(req.body.date);
    const productPrice = Number(req.body.productPrice);

    const newProduct = new Product({
        productName,
        productQuantity,
        date,
        productPrice
    });

    newProduct.save()
        .then(() => res.json('New Product Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/sell/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').put((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.productName = req.body.productName;
            product.productQuantity = req.body.productQuantity;
            product.date = req.body.date;
            product.productPrice = req.body.productPrice;

            product.save()
                .then(() => res.json('Product Details Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
