const express = require('express');
const Purchase = require('../models/Purchase');
const moment = require('moment');
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
	try {
		let conn = await sql.connect(config);
		let date = moment(purchase.date).format('YYYY-MM-DD');
		let clientCode = purchase.clientCode.replace('00', '');
		for (let key in purchase.articles) {
			if (purchase.articles.hasOwnProperty(key)) {
				article = purchase.articles[key];
				let articleCode = article.articleCode.replace('A', '0');
				let params =
					'(ArticleID, SellerID, ClientID, TimeID, Quantity, UnitPriceColones, TotalColones, ProfitColones, TaxColones, UnitPriceDollars, TotalDollars, ProfitDollars, TaxDollars)';
				let valueArticle =
					"(SELECT ID FROM DIM_ARTICLE WHERE ProvitionalCode = '" +
					articleCode +
					"'),";
				let valueSeller = '(SELECT ID FROM DIM_SELLER WHERE SellerCode = -1),';
				let valueClient =
					"(SELECT ID FROM DIM_CLIENT WHERE ClientCode = '" +
					clientCode +
					"'),";
				let valueTime =
					"(SELECT ID FROM DIM_TIME WHERE [Date] = CAST('" +
					date +
					"' AS Date)),";
				await conn.query(
					'INSERT INTO FACT_SALES' +
						params +
						' VALUES (' +
						valueArticle +
						valueSeller +
						valueClient +
						valueTime +
						'0, 0, 0, 0, 0, 0, 0, 0, 0)'
				);
			}
		}
		conn.close();
	} catch (error) {
		console.log(error);
		return;
	}
});

module.exports = router;
