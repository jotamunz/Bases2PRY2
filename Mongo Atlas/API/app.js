const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const schedule = require('node-schedule');
const sync = require('./sync');

const app = express();

// Middleware
app.use(cors());

app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log('connected to Atlas');
	}
);

// Routes imports
const purchaseRoute = require('./Routes/purchases');
app.use('/purchase', purchaseRoute);

// Server start
app.listen(3000, () => console.log('Server started on port 3000'));

// Sync job start
schedule.scheduleJob('29 * * * *', async function () {
	sync.syncDatabase();
});
