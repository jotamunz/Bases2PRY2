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
		unitPrice: Number,
		profit: Number,
		tax: Number
    ]
*/
// O: Saved purchase date
// E: 400
router.post('/', async (req, res) => {
	const purchase = new Purchase({
		clientCode: req.body.clientCode,
		articles: req.body.articles
	});
	let total = 0;
	for (let key in purchase.articles) {
		if (purchase.articles.hasOwnProperty(key)) {
			article = purchase.articles[key];
			article.articleTotal = article.quantity * article.unitPrice;
			total += article.articleTotal;
			article.tax = article.articleTotal * article.tax;
		}
	}
	purchase.orderTotal = total;
	try {
		const savedPurchase = await purchase.save();
		res.json({ date: savedPurchase.date });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
