require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
		console.log('connected to mongodb')
	} catch (error) {
		console.log('failed to connect to mongodb')
	}
}

const candidateSchema = new mongoose.Schema({
	lname: String,
	fname: String,
	email: String,
	interviewDate: Date,
	genie: String,
	telephone: String,
	cellule: String,
	motivation: String
})

const Candidate = mongoose.model('Candidate', candidateSchema)

const insertCandidate = async (candidate) => {
	await connectDB()
	const newCandidate = new Candidate(candidate)
	await newCandidate.save()
	await mongoose.disconnect()
}

const getCandidate = async (filter) => {
	await connectDB()
	const res = await Candidate.find(filter)
	await mongoose.disconnect()
	return res
}

const checkIfAvailable = async (datetime) => {
	await connectDB()
	const res = await Candidate.find({ interviewDate: datetime })
	return !(res.length > 0)
}

const availableDatesSchema = new mongoose.Schema({
	availableDate: Date,
	full: Number
})

const AvailableDate = mongoose.model('availabledates', availableDatesSchema)

const insertAvailableDate = async (datetime) => {
	await connectDB()
	const newDate = new AvailableDate({
		availableDate: datetime,
		full: 0
	})
	await newDate.save()
	console.log('saved')
	await mongoose.disconnect()
}

// (async () => {
// 	await insertAvailableDate(new Date(2021, 8, 23, 19, 0))
// 	await insertAvailableDate(new Date(2021, 8, 23, 19, 15))
// 	await insertAvailableDate(new Date(2021, 8, 23, 19, 30))
// 	await insertAvailableDate(new Date(2021, 8, 23, 19, 45))
// 	await insertAvailableDate(new Date(2021, 8, 24, 18, 0))
// 	await insertAvailableDate(new Date(2021, 8, 24, 18, 15))
// 	await insertAvailableDate(new Date(2021, 8, 24, 18, 30))
// 	await insertAvailableDate(new Date(2021, 8, 24, 18, 45))
// 	await insertAvailableDate(new Date(2021, 8, 28, 17, 0))
// 	await insertAvailableDate(new Date(2021, 8, 28, 17, 15))
// 	await insertAvailableDate(new Date(2021, 8, 28, 17, 30))
// 	await insertAvailableDate(new Date(2021, 8, 28, 17, 45))
// })()

const getAvailableDates = async (date) => {
	await connectDB()
	const allFree = await AvailableDate.find({ full: { $lt: 1 } })
	const filtered = allFree.filter(dateObj => {
		return dateObj.availableDate.getFullYear() === date.getFullYear() && dateObj.availableDate.getMonth() === date.getMonth() && dateObj.availableDate.getDate() === date.getDate()
	})
	await mongoose.disconnect()
	console.log(filtered)
	return filtered
}

// (async () => {
// 	let date = new Date(2021, 8, 23, 1, 0, 0)
// 	// date = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
// 	console.log(date)
// 	const res = await getAvailableDates(date)
// 	console.log(res)
// })()

const markDate = async (date) => {
	await connectDB()
	const res = await AvailableDate.updateOne({ availableDate: date }, { full: 1 })
	await mongoose.disconnect()
}

const writeToDatabase = async (candidate, datetime) => {
	await insertCandidate(candidate)
	await markDate(datetime)
}

const checkNameEmail = async (candidate) => {
	const re = /\S+@\S+\.\S+/
	if (!re.test(candidate.email)) {
		return false
	}
	await connectDB()
	const emails = await Candidate.find({}).select({ "email": 1, "_id": 0 })
	const fnames = await Candidate.find({}).select({ "fname": 1, "_id": 0 })
	const lnames = await Candidate.find({}).select({ "lname": 1, "_id": 0 })
	console.log('-------------------------------------------------------------------')
	console.log(emails)
	console.log(candidate.email)
	console.log(fnames)
	if (emails.filter(e => e.email === candidate.email).length > 0) {
		await mongoose.disconnect()
		console.log('error')
		return false
	}
	if (fnames.filter(n => n.fname.toUpperCase() === candidate.fname.toUpperCase()).length > 0 && lnames.filter(n => n.lname.toUpperCase() === candidate.lname.toUpperCase()).length > 0) {
		await mongoose.disconnect()
		return false
	}
	return true
}

const tempEmailsSchema = new mongoose.Schema({
	email: String
})

const TempEmail = mongoose.model('tempemail', tempEmailsSchema)

const insertTempEmail = async (email) => {
	await connectDB()
	const newTempEmail = new TempEmail({ email })
	await newTempEmail.save()
	await mongoose.disconnect()
}

const getTempEmails = async () => {
	await connectDB()
	const res = await TempEmail.find({})
	await mongoose.disconnect()
	return res
}

const checkEmailTemp = async (email) => {
	let tempEmails = await getTempEmails()
	console.log(tempEmails)
	tempEmails = tempEmails.map(el => el.email)
	console.log(tempEmails)
	console.log(email)
	console.log(`the requested email is ${email} -- ${!tempEmails.includes(email)}`)
	return !tempEmails.includes(email)
}

module.exports = {
	checkIfAvailable,
	insertAvailableDate,
	getAvailableDates,
	writeToDatabase,
	checkNameEmail,
	insertTempEmail,
	checkEmailTemp
}
