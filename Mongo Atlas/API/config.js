require('dotenv/config');

const config = {
	server: process.env.SQL_SERVER,
	database: process.env.SQL_DB,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	port: 1433,
	options: {
		encrypt: true,
		enableArithAbort: false
	}
};

module.exports = config;
