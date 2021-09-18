const { insertAvailableDate } = require("./database");
const { setCache } = require("./cache");

setCache();

(async () => {
	//mercredi
	await insertAvailableDate(new Date(2021, 8, 22, 14, 0))
	await insertAvailableDate(new Date(2021, 8, 22, 14, 15))
	await insertAvailableDate(new Date(2021, 8, 22, 20, 00))
	await insertAvailableDate(new Date(2021, 8, 22, 20, 15))
	await insertAvailableDate(new Date(2021, 8, 22, 22, 0))
	await insertAvailableDate(new Date(2021, 8, 22, 22, 15))
	//jeudi
	await insertAvailableDate(new Date(2021, 8, 23, 14, 0))
	await insertAvailableDate(new Date(2021, 8, 23, 14, 15))
	await insertAvailableDate(new Date(2021, 8, 23, 20, 00))
	await insertAvailableDate(new Date(2021, 8, 23, 20, 15))
	await insertAvailableDate(new Date(2021, 8, 23, 22, 0))
	await insertAvailableDate(new Date(2021, 8, 23, 22, 15))
	//vendredi
	await insertAvailableDate(new Date(2021, 8, 24, 14, 0))
	await insertAvailableDate(new Date(2021, 8, 24, 14, 15))
	await insertAvailableDate(new Date(2021, 8, 24, 20, 00))
	await insertAvailableDate(new Date(2021, 8, 24, 20, 15))
	await insertAvailableDate(new Date(2021, 8, 24, 22, 0))
	await insertAvailableDate(new Date(2021, 8, 24, 22, 15))
	//samedi
	await insertAvailableDate(new Date(2021, 8, 25, 14, 0))
	await insertAvailableDate(new Date(2021, 8, 25, 14, 15))
	await insertAvailableDate(new Date(2021, 8, 25, 20, 00))
	await insertAvailableDate(new Date(2021, 8, 25, 20, 15))
	await insertAvailableDate(new Date(2021, 8, 25, 22, 0))
	await insertAvailableDate(new Date(2021, 8, 25, 22, 15))
	//dimanche
	await insertAvailableDate(new Date(2021, 8, 26, 14, 0))
	await insertAvailableDate(new Date(2021, 8, 26, 14, 15))
	await insertAvailableDate(new Date(2021, 8, 26, 20, 00))
	await insertAvailableDate(new Date(2021, 8, 26, 20, 15))
	await insertAvailableDate(new Date(2021, 8, 26, 22, 0))
	await insertAvailableDate(new Date(2021, 8, 26, 22, 15))
})()