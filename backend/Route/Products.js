const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/FetchUser');
const products = require('../Model/Products');
const { body, validationResult } = require('express-validator');



router.get('/FetchAllProducts', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }

});

// ROUTE 1: Get All the Products using: GET "/api/products/fetchallproducts". Login required
router.get('/FetchAllProductsByUser', fetchuser, async (req, res) => {
    try {
        const allProducts = await products.find({ user: req.user.id });
        res.json(allProducts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.post('/AddProduct', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters').isLength({ min: 5 }),
    body('price', 'Price should be a number').isNumeric()
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id, title, description, price ,img} = req.body;
        const product = new products({
            user: req.user.id,
            id,
            title,
            description,
            price,
            img
        });
        const savedProduct = await product.save();
        res.json(savedProduct);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }       
});
 
router.delete('/DeleteProduct', fetchuser, async (req, res) => {
    try {
        let product = await products.findById(req.query.id);
        if (!product) {
            return res.status(404).send("Not Found");
        }
        if (product.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        product = await products.findByIdAndDelete(req.query.id);
        res.json({ "Success": "Product has been deleted", product: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;