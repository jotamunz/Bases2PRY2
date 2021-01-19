const express = require('express');
const Purchase = require('../models/Purchase');
const sql = require('mssql');
const config = require('../config');

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
    ],
	currency: Number
*/
// O: Saved purchase date
// E: 400
router.post('/', async (req, res) => {
	const purchase = new Purchase({
		clientCode: req.body.clientCode,
		articles: req.body.articles,
		currency: req.body.currency
	});
	let total = 0;
	for (let key in purchase.articles) {
		if (purchase.articles.hasOwnProperty(key)) {
			article = purchase.articles[key];
			article.articleTotal = article.quantity * article.unitPrice;
			total += article.articleTotal;
		}
	}
	purchase.orderTotal = total;
	try {
		const savedPurchase = await purchase.save();
		res.json({ date: savedPurchase.date });
	} catch (error) {
		res.status(400).json({ message: error.message });
		return;
	}

	// TEMP QUERY
	try {
		let con = await sql.connect(config);
		let ret = await con.request().query('SELECT * FROM DIM_GROUP');
		console.log(ret.recordsets);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
