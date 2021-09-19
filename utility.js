const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const sendEmailToCandidate = async (candidate, datetime) => {
	console.log('sending email to candidate')

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD2,
		},
	});

	const info = await transporter.sendMail({
		from: `"Emicatronic 🤖" ${process.env.EMAIL} `,
		to: candidate.email,
		subject: "Candidature Emicatronic",
		html: template2(candidate, datetime),
	});

	console.log("Message sent: %s", info.messageId);
}

const template = (candidate, datetime) => {

	return `<h2>Candidature Emicatronic</h2><br/><h4>Bonjour ${candidate.fname} ${datetime}, vous souhaitez prendre un rendez vous de recrutement emicatronic le ${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}></h4><br/><a href="${link}">Click here to verify this email</a><br/>`
}

const template2 = (candidate, datetime) => {
	const token = jwt.sign({ candidate, datetime }, process.env.SECRET, { expiresIn: '1h' })
	const link = `https://www.emicatronic.com/api/verify/${token}`
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Comite</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
		<link href="https://fonts.googleapis.com/css2?family=Righteous&amp;display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"> 
	
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<style>
		.btn-dialna {
		color: #fff;
		background: #021c4e !important ;
		border-color: #021c4eaa;
	}
	td:first-child {
		color: #fff;
		background: #021c4e !important ;
		border-color: #021c4eaa;
	}
		</style>
	</head>
	
	<body>
	<div class='row p-3' style='background:#021c4e'>
	<h3 class='text-white m-0'   style='font-family:Righteous'> EMICATR<i class="fa fa-cog" aria-hidden="true"></i>NIC </h1>
	
	</div>
	<div class='row p-4' >
	<p class="text-left"> Vous avez postule pour rejoindre le club EMICATR<i class="fa fa-cog" aria-hidden="true"></i>NIC. Durant cette procedure vous avez fourni les informations et les choixs des crenaux suivants :  </p>
	<br>
	<table class="table table-sm text-center">
		<tbody>
		<tr>
			<td>Nom Complet</td>
			<td>${candidate.lname} ${candidate.fname}</td>
		</tr>
		<tr>
			<td>Email</td>
			<td>${candidate.email}</td>
		</tr>
		<tr>
			<td>Genie</td>
			<td>${candidate.genie}</td>
		</tr>
		<tr>
			<td>Telephone</td>
			<td>${candidate.telephone}</td>
		</tr>
		<tr>
			<td>Date et heure de l'entretien</td>
			<td>${datetime}</td>
		</tr>
		<tr>
			<td>Choix de cellule</td>
			<td>${candidate.cellule}</td>
		</tr>
		</tbody>
	</table>
	<br>
	<p class="text-left"> Reste une seule etape pour completer la procedure, c'est confirmer votre email en cliquant sur le lien suivant :  </p>
	<br>
	<a href="${link}" class="btn btn-dialna"> Verifier votre email</a>
	</div>
	</body>
	
	</html>`
}

module.exports = { sendEmailToCandidate }