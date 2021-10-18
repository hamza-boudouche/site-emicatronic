const redis = require('async-redis')

const writeToCalendarTemp = async (client, candidate, chosenDate) => {
	if (await getValue(client, `${chosenDate} - 1`)) {
		if (await getValue(client, `${chosenDate} - 2`)) {
			if (await getValue(client, `${chosenDate} - 3`)) {
				return false
			} else {
				await client.set(`${chosenDate} - 3`, `${candidate.fname}-${candidate.lname}`, 'EX', 60 * 30);
			}
		} else {
			await client.set(`${chosenDate} - 2`, `${candidate.fname}-${candidate.lname}`, 'EX', 60 * 30);
		}
	} else {
		await client.set(`${chosenDate} - 1`, `${candidate.fname}-${candidate.lname}`, 'EX', 60 * 30);
	}
	return true
}

const getValue = async (client, key) => {
	const existingValue = await client.get(key);
	return existingValue
}

const getList = async (client, key) => {
	const res = await client.lrange(key, 0, -1)
	return res
}

// (async () => {
// 	const redisCredentials = {
// 		host: process.env.REDIS_HOST,
// 		port: process.env.REDIS_PORT
// 	}
// 	const redisClient = redis.createClient(redisCredentials)
// 	await redisClient.setAsync('startDate', new Date(2021, 8, 23));
// 	await redisClient.setAsync('endDate', new Date(2021, 8, 30));

// 	await redisClient.lpushAsync("exceptionDates", new Date(2021, 8, 25))
// 	await redisClient.lpushAsync("exceptionDates", new Date(2021, 8, 26))
// 	await redisClient.lpushAsync("exceptionDates", new Date(2021, 8, 27))
// 	console.log(await redisClient.lrangeAsync("mylist", 0, -1))
// })()

async function setCache() {
	const redisCredentials = {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
	}
	const redisClient = redis.createClient(redisCredentials)
	await redisClient.set('startDate', new Date(2021, 9, 22));
	await redisClient.set('endDate', new Date(2021, 9, 24));
}

module.exports = { writeToCalendarTemp, getValue, getList, setCache };
