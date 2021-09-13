let chosenDate = null;
const ipAdd = 'http://192.168.1.102:5000';

(async () => {
	try {
		console.log('here')
		await fetch(`${ipAdd}/test`)
	} catch (error) {
		alert('the server is either unreachable or down, retry another time')
	}
})();

const submitMeeting = async () => {
	console.log("changed")
	// alert("you clicked me")
	//get date and format it
	const dateValue = document.getElementById('datepicker-disabled-days').value
	const values = dateValue.split('/')
	values.reverse()
	const newDate = values.join('-')
	const date = new Date(newDate)

	// send get request
	const res = await fetch(`${ipAdd}/api/date/${date}`)
	const data = await res.json()

	// show results
	const resultContainer = document.getElementById('result')
	resultContainer.innerHTML = ''
	ul = document.createElement('ul');
	resultContainer.appendChild(ul);
	console.log(data.intervals)
	data.intervals.forEach((interval) => {
		let li = document.createElement('li');
		li.style.cssText = 'display:inline; margin-right:0.5rem'
		ul.appendChild(li);
		console.log(new Date(interval).getHours())
		//const hours = interval.getHours()
		li.innerHTML += `<input type="button" id="${interval}" value="${new Date(interval).getHours() - 1} : ${new Date(interval).getMinutes()}" onclick="submitTime(this)" class="btn btn-primary btn-dialna"/>`
	});
}

const submitTime = async (el) => {
	const value = el.id;
	console.log(`button with value ${value} was pressed`)
	chosenDate = value
	document.getElementById('chosenDate').innerHTML = `Chosen date: ${chosenDate.toString()}`
}

const submitAll = async () => {
	document.getElementById('success').innerHTML = ""

	const lname = document.getElementById('lname').value
	const fname = document.getElementById('fname').value
	const email = document.getElementById('email').value
	const genie = document.getElementById('genie').value
	const telephone = document.getElementById('telephone').value
	const cellule = document.getElementById('cellule').value
	const motivation = document.getElementById('motivation').value

	console.log(`name: ${lname} ${fname} -- email ${email} -- meeting-time: ${chosenDate}`)

	if (!fname) {
		alert("first name is required")
		return
	}
	if (!lname) {
		alert("last name is required")
		return
	}
	if (!email) {
		alert("email is required")
		return
	}
	if (!chosenDate) {
		alert("date and time are required")
		return
	}
	if (!genie) {
		alert("genie is required")
		return
	}
	if (!telephone) {
		alert("telephone is required")
		return
	}
	if (!cellule) {
		alert("cellule is required")
		return
	}
	if (!motivation) {
		alert("motivation is required")
		return
	}

	const body = {
		lname,
		fname,
		email,
		chosenDate,
		genie,
		telephone,
		cellule,
		motivation
	}

	const res = await fetch(`${ipAdd}/api/conference/`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-type": "application/json; charset=UTF-8" }
	})

	const data = await res.json()
	if (data.success === true) {
		alert("Operation successful, check your email")
	} else {
		alert(`Operation failed --- ${data.message}`)
	}
}
