let chosenDate = null;
const ipAdd = 'https://www.emicatronic.com';

(async () => {
	try {
		console.log('here')
		await fetch(`${ipAdd}/test`)
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: 'Server down',
			text: 'the server is either unreachable or down, retry another time',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
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
	console.log(data.intervals)
	data.intervals.forEach((interval) => {
		console.log(new Date(interval).getHours())
		//const hours = interval.getHours()
		const minutes = new Date(interval).getMinutes() != 0 ? new Date(interval).getMinutes() : ((new Date(interval).getMinutes()) + "0")
		resultContainer.innerHTML += `<input type="button" id="${interval}" value="${new Date(interval).getHours() - 1} : ${minutes}" onclick="submitTime(this)" class="btn btn-dialna"/>`
	});
}

const submitTime = async (el) => {
	const value = el.id;
	console.log(`button with value ${value} was pressed`)
	chosenDate = value
	console.log(chosenDate)
	const chosenDateDate = `${new Date(chosenDate).getFullYear()}/${new Date(chosenDate).getMonth() + 1}/${new Date(chosenDate).getDate()}`
	const minutes = new Date(chosenDate).getMinutes() != 0 ? new Date(chosenDate).getMinutes() : ((new Date(chosenDate).getMinutes()) + "0")
	const chosenDateTime = `${new Date(chosenDate).getHours() - 1}:${minutes}`
	document.getElementById('chosenDateDate').innerHTML = '<span class="pre_coor">You will be interviewed on :</span><br>' + chosenDateDate
	document.getElementById('chosenDateTime').innerHTML = '<span class="pre_coor">At :</span><br>' + chosenDateTime
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

	console.log(`name: ${lname} ${fname} --email ${email} --meeting - time: ${chosenDate} `)

	if (!fname) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'First name is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!lname) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Last name is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!email) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Email is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!chosenDate) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Date and time are required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!genie) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Branch is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!telephone) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Phone number is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!cellule) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Team is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!motivation) {
		Swal.fire({
			icon: 'Error',
			title: 'Missing info',
			text: 'Motivation is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
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
		Swal.fire({
			icon: 'Success',
			title: 'Operation successful',
			text: 'Check your email',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
	} else {
		Swal.fire({
			icon: 'Error',
			title: 'Operation failed',
			text: data.message,
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
	}
}
