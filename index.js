require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sendEmailToCandidate } = require('./utility')
const { writeToCalendar } = require('./googleCalendarApi')
const {
	checkIfAvailable,
	insertAvailableDate,
	getAvailableDates,
	writeToDatabase,
	checkNameEmail,
	insertTempEmail,
	checkEmailTemp
} = require('./database')
const { writeToCalendarTemp, getValue, getList } = require('./cache')

const redis = require('async-redis')
const jwt = require('jsonwebtoken')
const app = express()
const redisCredentials = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT
}
const redisClient = redis.createClient(redisCredentials)
const port = process.env.PORT || 5000

app.use(morgan('dev'))
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.get('/test', (req, res) => {
	res.send('working')
})

app.get('/initialInfo', async (req, res) => {
	const response = {
		startDate: await getValue(redisClient, 'startDate'),
		endDate: await getValue(redisClient, 'endDate'),
		exceptionDates: await getList(redisClient, 'exceptionDates')
	}
	res.json(response)
})

app.get('/api/date/:date', async (req, res) => {
	const date = req.params['date']
	console.log(`date requested ${Date(date)}`)
	const intervals = await getAvailableDates(new Date(date))
	res.json({
		intervals: intervals.map(interval => interval.availableDate)
	})
})

app.post('/api/conference/', async (req, res) => {
	const { lname, fname, email, chosenDate, genie, telephone, cellule, motivation } = req.body
	if (!fname) {
		return res.json({ success: false, message: 'first name is required' })
	}
	if (!lname) {
		return res.json({ success: false, message: 'last name is required' })
	}
	if (!email) {
		return res.json({ success: false, message: 'email is required' })
	}
	if (!chosenDate) {
		return res.json({ success: false, message: 'date and time are required' })
	}
	if (!genie) {
		return res.json({ success: false, message: 'genie is required' })
	}
	if (!telephone) {
		return res.json({ success: false, message: 'telephone is required' })
	}
	if (!cellule) {
		return res.json({ success: false, message: 'cellule is required' })
	}
	if (!motivation) {
		return res.json({ success: false, message: 'motivation is required' })
	}
	console.log(req.body)
	console.log("---" + chosenDate)
	// && checkCalendar(chosenDate)
	const nameAndEmailAvailable = await checkNameEmail({ lname, fname, email })
	if (!nameAndEmailAvailable) {
		return res.json({ success: false, message: 'Either your full name or your email have already been used in another successful application, therfore it can\'t be used more than once' })
	}
	const emailTempAvailable = await checkEmailTemp(email)
	if (!emailTempAvailable) {
		return res.json({ success: false, message: 'This email has already been used by another candidate in another pending application' })
	}
	const isAvailable = await checkIfAvailable(chosenDate)
	if (!isAvailable) {
		return res.json({ success: false, message: 'The chosen date is not available anymore' })
	}
	const isAvailableInTempStorage = await writeToCalendarTemp(redisClient, { lname, fname }, chosenDate)
	if (!isAvailableInTempStorage) {
		return res.json({ success: false, message: 'The chosen date has already been chosen by another candidate but is not yet validated, try again after 30 minutes or pick another date' })
	}
	if (isAvailable && isAvailableInTempStorage && nameAndEmailAvailable && emailTempAvailable) {
		sendEmailToCandidate({ lname, fname, email, genie, telephone, cellule, motivation }, chosenDate)
		insertTempEmail(email)
		res.json({ success: true, message: 'check your email' })
	} else {
		res.json({ success: false, message: 'internal server error' })
	}
})

app.get('/api/verify/:jwtKey', (req, res) => {
	const jwtKey = req.params['jwtKey']
	try {
		const { candidate, datetime } = jwt.verify(jwtKey, process.env.SECRET)
		writeToCalendar(candidate, datetime)
		writeToDatabase({
			lname: candidate.lname,
			fname: candidate.fname,
			email: candidate.email,
			interviewDate: datetime,
			genie: candidate.genie,
			telephone: candidate.telephone,
			cellule: candidate.cellule,
			motivation: candidate.motivation,
		}, datetime)
		res.sendFile('./email_verified.html', { root: __dirname })
	} catch (error) {
		console.log(error)
		res.sendFile('./email_not_verified.html', { root: __dirname })
	}
})

app.listen(port, () => {
	console.log(`Server is listening on ${port}`)
})
