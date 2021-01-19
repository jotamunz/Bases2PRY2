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
		try {
			let conn = await sql.connect(config);
			let params =
				'(ArticleID, SellerID, ClientID, TimeID, Quantity, UnitPriceColones, TotalColones, ProfitColones, TaxColones, UnitPriceDollars, TotalDollars, ProfitDollars, TaxDollars)';
			for (let key in purchases) {
				if (purchases.hasOwnProperty(key)) {
					let purchase = purchases[key];
					let date = moment(purchase.date).format('YYYY-MM-DD');
					let clientCode = purchase.clientCode.replace('00', '');
					for (let key in purchase.articles) {
						if (purchase.articles.hasOwnProperty(key)) {
							let article = purchase.articles[key];
							let articleCode = article.articleCode.replace('A', '0');
							let valueArticle =
								"(SELECT ID FROM DIM_ARTICLE WHERE ProvitionalCode = '" +
								articleCode +
								"'),";
							let valueSeller =
								'(SELECT ID FROM DIM_SELLER WHERE SellerCode = -1),';
							let valueClient =
								"(SELECT ID FROM DIM_CLIENT WHERE ClientCode = '" +
								clientCode +
								"'),";
							let valueTime =
								"(SELECT ID FROM DIM_TIME WHERE [Date] = CAST('" +
								date +
								"' AS Date)),";
							try {
								await conn.query(
									'INSERT INTO FACT_SALES' +
										params +
										' VALUES (' +
										valueArticle +
										valueSeller +
										valueClient +
										valueTime +
										article.quantity.toString() +
										',' +
										article.unitPrice.toString() +
										',' +
										article.articleTotal.toString() +
										',' +
										article.profit.toString() +
										',' +
										article.tax.toString() +
										',' +
										'0, 0, 0, 0)'
								);
							} catch (error) {
								console.log('The following article failed to sync:');
								console.log(article);
							}
						}
					}
				}
			}
			conn.close();
			console.log('Data Warehouse sync completed');
		} catch (error) {
			// Azure error
			console.log(error);
		}
		// Update synced value
	} catch (error) {
		// Atlas error
		console.log(error);
	}
}

exports.syncDatabase = syncDatabase;
