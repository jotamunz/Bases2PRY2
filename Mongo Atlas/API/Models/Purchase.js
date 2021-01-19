const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
	{
		articleCode: {
			type: String,
			required: true,
			match: /A[0-9]{6}/
		},
		quantity: {
			type: Number,
			required: true,
			min: 0,
			validate: {
				validator: Number.isInteger
			}
		},
		unitPrice: {
			type: Number,
			required: true,
			min: 0
		},
		articleTotal: {
			type: Number,
			required: true,
			min: 0
		},
		profit: {
			type: Number,
			required: true,
			min: 0
		},
		tax: {
			type: Number,
			required: true,
			min: 0,
			max: 1
		}
	},
	{ _id: false }
);

const PurchaseSchema = mongoose.Schema({
	clientCode: {
		type: String,
		required: true,
		match: /C[0-9]{6}/
	},
	articles: {
		type: [ArticleSchema],
		required: true
	},
	orderTotal: {
		type: Number,
		required: true,
		min: 0
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Purchases', PurchaseSchema);
