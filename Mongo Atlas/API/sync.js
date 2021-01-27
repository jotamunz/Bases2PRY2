const sql = require('mssql');
const config = require('./config');
const moment = require('moment');
const Purchase = require('./models/Purchase');

async function syncDatabase() {
	try {
		const purchases = await Purchase.find(
			{ 'articles.synced': false },
			{ __v: 0 }
		);
		try {
			let conn = await sql.connect(config);
			let params =
				'(ArticleID, SellerID, ClientID, TimeID, Quantity, UnitPriceColones, TotalColones, ProfitColones, TaxColones, UnitPriceDollars, TotalDollars, ProfitDollars, TaxDollars)';
			let prevDate = '';
			let dollarSell;
			for (let key in purchases) {
				if (purchases.hasOwnProperty(key)) {
					const purchase = purchases[key];
					let date = moment(purchase.date).format('YYYY-MM-DD');
					let clientCode = purchase.clientCode.replace('00', '');
					if (date != prevDate) {
						try {
							let res = await conn
								.request()
								.query(
									"SELECT DollarSell FROM DIM_TIME WHERE [Date] = CAST('" +
										date +
										"' AS Date)"
								);
							dollarSell = res.recordset[0].DollarSell;
							prevDate = date;
						} catch (error) {
							console.log('Error retrieving currency exchange for ' + date);
							console.log('The following purchase failed to sync');
							console.log(purchase);
							continue;
						}
					}
					for (let key in purchase.articles) {
						if (purchase.articles.hasOwnProperty(key)) {
							const article = purchase.articles[key];
							if (article.synced == true) {
								continue;
							}
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
										(article.unitPrice / dollarSell).toString() +
										',' +
										(article.articleTotal / dollarSell).toString() +
										',' +
										(article.profit / dollarSell).toString() +
										',' +
										(article.tax / dollarSell).toString() +
										')'
								);
							} catch (error) {
								console.log('Error in values or foreign keys');
								console.log('The following article failed to sync:');
								console.log(article);
								continue;
							}
							article.synced = true;
						}
					}
					try {
						await purchase.save();
					} catch (error) {
						console.log('Error saving data to Atlas');
					}
				}
			}
			conn.close();
			console.log('Data Warehouse sync completed');
		} catch (error) {
			console.log('Error establishing connection to Azure');
		}
	} catch (error) {
		console.log('Error retrieving data from Atlas');
	}
}

exports.syncDatabase = syncDatabase;
