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
