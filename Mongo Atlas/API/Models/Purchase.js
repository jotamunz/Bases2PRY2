const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
	{
		articleCode: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		unitPrice: {
			type: Number,
			required: true
		}
	},
	{ _id: false }
);

const PurchaseSchema = mongoose.Schema({
	clientCode: {
		type: String,
		required: true
	},
	articles: {
		type: [ArticleSchema],
		required: true
	},
	currency: {
		type: Number,
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	tax: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Purchases', PurchaseSchema);
