const { insertAvailableDate } = require("./database");
const { setCache } = require("./cache");

setCache();

(async () => {
	//vendredi
	for (let i = 19; i <= 23; i++) {
		await insertAvailableDate(new Date(2021, 10, 22, i, 0))
		await insertAvailableDate(new Date(2021, 10, 22, i, 15))
		await insertAvailableDate(new Date(2021, 10, 22, i, 30))
		await insertAvailableDate(new Date(2021, 10, 22, i, 45))
	}

	//samedi
	for (let i = 10; i <= 12; i++) {
		await insertAvailableDate(new Date(2021, 10, 23, i, 0))
		await insertAvailableDate(new Date(2021, 10, 23, i, 15))
		await insertAvailableDate(new Date(2021, 10, 23, i, 30))
		await insertAvailableDate(new Date(2021, 10, 23, i, 45))
	}

	for (let i = 14; i <= 18; i++) {
		await insertAvailableDate(new Date(2021, 10, 23, i, 0))
		await insertAvailableDate(new Date(2021, 10, 23, i, 15))
		await insertAvailableDate(new Date(2021, 10, 23, i, 30))
		await insertAvailableDate(new Date(2021, 10, 23, i, 45))
	}

	//dimanche
	for (let i = 10; i <= 12; i++) {
		await insertAvailableDate(new Date(2021, 10, 24, i, 0))
		await insertAvailableDate(new Date(2021, 10, 24, i, 15))
		await insertAvailableDate(new Date(2021, 10, 24, i, 30))
		await insertAvailableDate(new Date(2021, 10, 24, i, 45))
	}

	for (let i = 14; i <= 18; i++) {
		await insertAvailableDate(new Date(2021, 10, 24, i, 0))
		await insertAvailableDate(new Date(2021, 10, 24, i, 15))
		await insertAvailableDate(new Date(2021, 10, 24, i, 30))
		await insertAvailableDate(new Date(2021, 10, 24, i, 45))
	}
})()