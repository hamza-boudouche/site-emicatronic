const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const calendar = google.calendar({ version: "v3" });
const auth = new google.auth.JWT(
	CREDENTIALS.client_email,
	null,
	CREDENTIALS.private_key,
	SCOPES,
);
const TIMEOFFSET = '+02:00';

const dateTimeForCalander = ({ _year, _month, _day, _hour, _minute, _second }) => {

	let date = new Date()
	date.setFullYear(_year)
	date.setMonth(_month - 1)
	date.setDate(_day)
	date.setHours(_hour)
	date.setMinutes(_minute)
	date.setSeconds(_second)

	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month < 10) {
		month = `0${month}`;
	}
	let day = date.getDate();
	if (day < 10) {
		day = `0${day}`;
	}
	let hour = date.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minute = date.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}

	const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

	const event = new Date(Date.parse(newDateTime));

	const startDate = event;

	const endDate = new Date(new Date(startDate).setMinutes(startDate.getMinutes() + 15));

	return {
		'start': startDate,
		'end': endDate
	}
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {
	try {
		console.log(calendar)

		let response = await calendar.events.insert({
			auth: auth,
			calendarId: calendarId,
			resource: event,
			sendNotifications: true,
		});

		if (response['status'] == 200 && response['statusText'] === 'OK') {
			console.log(response)
			return 1;
		} else {
			return 0;
		}
	} catch (error) {
		console.log('Error at insertEvent');
		// console.log(error)
		return 0;
	}
};

// let dateTime = dateTimeForCalander((new Date("2021-08-03T0:45")));
const wrapper = async (candidate, dateRaw) => {

	dateRaw = new Date(dateRaw)
	console.log(dateRaw)

	const date = {
		_year: dateRaw.getFullYear(),
		_month: dateRaw.getMonth() + 1,
		_day: dateRaw.getDate(),
		_hour: dateRaw.getHours(),
		_minute: dateRaw.getMinutes(),
		_second: 0
	}

	console.log(date)


	const dateTime = dateTimeForCalander(date);

	console.log(dateTime)

	const event = {
		summary: `Recrutement EMIcatronic`,
		description: `<h3>${candidate.fname} ${candidate.lname}</h3>
		<br/>
		<p>email: ${candidate.email}</p>
		<p>genie: ${candidate.genie}</p>
		<p>cellule: ${candidate.cellule}</p>`,
		start: {
			'dateTime': dateTime['start'],
			'timeZone': 'UTC+1'
		},
		end: {
			'dateTime': dateTime['end'],
			'timeZone': 'UTC+1'
		},
		reminders: {
			useDefault: false,
			overrides: [
				{ method: 'email', 'minutes': 24 * 60 },
				{ method: 'popup', 'minutes': 10 },
			]
		},
		colorId: 4
	}

	insertEvent(event)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
}

// Get all the events between two dates
// const getEvents = async (dateTimeStart, dateTimeEnd) => {

// 	try {
// 		let response = await calendar.events.list({
// 			auth: auth,
// 			calendarId: calendarId,
// 			timeMin: dateTimeStart,
// 			timeMax: dateTimeEnd,
// 			timeZone: 'Asia/Kolkata'
// 		});

// 		let items = response['data']['items'];
// 		return items;
// 	} catch (error) {
// 		console.log(`Error at getEvents --> ${error}`);
// 		return 0;
// 	}
// };

// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
// const deleteEvent = async (eventId) => {

// 	try {
// 		let response = await calendar.events.delete({
// 			auth: auth,
// 			calendarId: calendarId,
// 			eventId: eventId
// 		});

// 		if (response.data === '') {
// 			return 1;
// 		} else {
// 			return 0;
// 		}
// 	} catch (error) {
// 		console.log(`Error at deleteEvent --> ${error}`);
// 		return 0;
// 	}
// };

// let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

// deleteEvent(eventId)
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

module.exports = {
	writeToCalendar: wrapper,
}