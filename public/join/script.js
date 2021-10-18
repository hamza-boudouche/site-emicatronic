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
		resultContainer.innerHTML += `<div class="col-4 col-md-2 mb-2"><input type="button" id="${interval}" value="${new Date(interval).getHours() == 0 ? 23 : new Date(interval).getHours() - 1} : ${minutes}" onclick="submitTime(this)" class="btn btn-dialna w-100"/></div>`
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
	document.getElementById('chosenDateDate').innerHTML = '<span class="pre_coor">You will be interviewed on :</span><br>' + '<i class="fa fa-calendar text-dialna" aria-hidden="true"></i>' + ' ' + chosenDateDate
	document.getElementById('chosenDateTime').innerHTML = '<span class="pre_coor">At :</span><br>' + '<i class="fa fa-clock-o text-dialna" aria-hidden="true"></i>' + ' ' + chosenDateTime
}

const submitAll = async () => {
	document.getElementById('success').innerHTML = ""

	const lname = document.getElementById('lname').value
	const fname = document.getElementById('fname').value
	const email = document.getElementById('email').value
	const genie = document.getElementById('genie').value
	const telephone = document.getElementById('telephone').value
	const cellule = document.getElementById('cellule').value
	const cellule1 = document.getElementById('cellule1').value
	const motivation = document.getElementById('motivation').value

	console.log(`name: ${lname} ${fname} --email ${email} --meeting - time: ${chosenDate} `)

	if (!fname) {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'First name is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!lname) {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Last name is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!email) {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Email is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!chosenDate) {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Date and time are required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!genie && !genie === 'Branch') {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Branch is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!telephone) {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Phone number is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!cellule && !cellule === 'First choice of a team to join') {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'First team is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!cellule1 && !cellule1 === 'Second choice of a team to join') {
		Swal.fire({
			icon: 'error',
			title: 'Missing info',
			text: 'Second team is required',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
		return
	}
	if (!motivation) {
		Swal.fire({
			icon: 'error',
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
		cellule1,
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
			icon: 'success',
			title: 'Operation successful',
			text: 'You have successfully completed the first part of the registration process. Don\'t forget to check your email and validate it by clicking on the validation link (expires in 30 minutes)',
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
	} else {
		Swal.fire({
			icon: 'error',
			title: 'Operation failed',
			text: data.message,
			footer: '<a href="mailto:emicatronic2.emi@gmail.com">Having touble? Contact us here.</a>'
		})
	}
}
