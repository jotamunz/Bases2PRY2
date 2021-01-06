const express = require('express');
const Purchase = require('../models/Purchase');

const router = express.Router();

/*POSTS*/

// SAVE NEW PURCHASE
// I:
/*
	clientCode: String,
    articles: 
    [
        articleCode: String,
        quantity: Number,
        unitPrice: Number
    ],
	currency: Number,
	tax: Number
*/
// O: Saved purchase date
// E: 408, 400
router.post('/', async (req, res) => {
	const purchase = new Purchase({
		clientCode: req.body.clientCode,
		articles: req.body.articles,
		currency: req.body.currency,
		tax: req.body.tax
	});
	// TODO
	purchase.orderTotal;
	try {
		const savedPurchase = await purchase.save();
		res.json({ date: savedPurchase.date });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});
