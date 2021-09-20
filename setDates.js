const { insertAvailableDate } = require("./database");
const { setCache } = require("./cache");

setCache();

(async () => {
	//jeudi
	await insertAvailableDate(new Date(2021, 8, 23, 13, 0))
	await insertAvailableDate(new Date(2021, 8, 23, 13, 15))
	await insertAvailableDate(new Date(2021, 8, 23, 19, 00))
	await insertAvailableDate(new Date(2021, 8, 23, 19, 15))
	await insertAvailableDate(new Date(2021, 8, 23, 21, 0))
	await insertAvailableDate(new Date(2021, 8, 23, 21, 15))
	//vendredi
	await insertAvailableDate(new Date(2021, 8, 24, 13, 0))
	await insertAvailableDate(new Date(2021, 8, 24, 13, 15))
	await insertAvailableDate(new Date(2021, 8, 24, 19, 00))
	await insertAvailableDate(new Date(2021, 8, 24, 19, 15))
	await insertAvailableDate(new Date(2021, 8, 24, 21, 0))
	await insertAvailableDate(new Date(2021, 8, 24, 21, 15))
	//samedi
	await insertAvailableDate(new Date(2021, 8, 25, 13, 0))
	await insertAvailableDate(new Date(2021, 8, 25, 13, 15))
	await insertAvailableDate(new Date(2021, 8, 25, 19, 00))
	await insertAvailableDate(new Date(2021, 8, 25, 19, 15))
	await insertAvailableDate(new Date(2021, 8, 25, 21, 0))
	await insertAvailableDate(new Date(2021, 8, 25, 21, 15))
	//dimanche
	await insertAvailableDate(new Date(2021, 8, 26, 13, 0))
	await insertAvailableDate(new Date(2021, 8, 26, 13, 15))
	await insertAvailableDate(new Date(2021, 8, 26, 19, 00))
	await insertAvailableDate(new Date(2021, 8, 26, 19, 15))
	await insertAvailableDate(new Date(2021, 8, 26, 21, 0))
	await insertAvailableDate(new Date(2021, 8, 26, 21, 15))
	//lundi
	await insertAvailableDate(new Date(2021, 8, 27, 13, 0))
	await insertAvailableDate(new Date(2021, 8, 27, 13, 15))
	await insertAvailableDate(new Date(2021, 8, 27, 19, 00))
	await insertAvailableDate(new Date(2021, 8, 27, 19, 15))
	await insertAvailableDate(new Date(2021, 8, 27, 21, 0))
	await insertAvailableDate(new Date(2021, 8, 27, 21, 15))
})()