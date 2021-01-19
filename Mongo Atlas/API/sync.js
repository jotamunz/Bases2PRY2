const sql = require('mssql');
const config = require('./config');
const moment = require('moment');
const Purchase = require('./models/Purchase');

async function syncDatabase() {
	try {
		const purchases = await Purchase.find(
			{ synced: false },
			{ _id: 0, __v: 0 }
		);
		console.log(purchases);
	} catch (error) {
		console.log(error);
	}
	/*
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
    }
    */
}

exports.syncDatabase = syncDatabase;
