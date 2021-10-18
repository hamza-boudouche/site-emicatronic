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
		html: template3(candidate, datetime),
	});

	console.log("Message sent: %s", info.messageId);
}

const template3 = (candidate, datetime) => {
	const token = jwt.sign({ candidate, datetime }, process.env.SECRET, { expiresIn: '1h' })
	const link = `https://www.emicatronic.com/api/verify/${token}`
	const chosenDate = datetime
	const chosenDateDate = `${new Date(chosenDate).getFullYear()}/${new Date(chosenDate).getMonth() + 1}/${new Date(chosenDate).getDate()}`
	const minutes = new Date(chosenDate).getMinutes() != 0 ? new Date(chosenDate).getMinutes() : ((new Date(chosenDate).getMinutes()) + "0")
	const chosenDateTime = `${new Date(chosenDate).getHours()}:${minutes}`
	return (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Comite</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
		<link href="https://fonts.googleapis.com/css2?family=Righteous&amp;display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
  <img src="https://i.imgur.com/0kMBynY.png" style="width: 100%;" onclick=''>
<div class='row p-4' >
<p class="text-left"> Hi, <br> You requested to pass an interview in order to join <b>EMICATRONIC</b>. <br> These are all the details you provided us while completing the form :  </p>
<br>
<table class="table table-sm text-center">
  <tbody>
    <tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Full Name</td>
      <td style="padding:5px 10px;">${candidate.lname} ${candidate.fname}</td>
    </tr>
	<tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Email</td>
      <td style="padding:5px 10px;">${candidate.email}</td>
    </tr>
	<tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Branch</td>
      <td style="padding:5px 10px;">${candidate.genie}</td>
    </tr>
	<tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Phone Number</td>
      <td style="padding:5px 10px;">${candidate.telephone}</td>
    </tr>
	<tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Interview's Time & Date</td>
      <td style="padding:5px 10px;">${chosenDateDate} at ${chosenDateTime}</td>
    </tr>
	<tr>
      <td style='background:#021c4e;color:white;font-weight:bold;padding:5px 10px;'>Chosen Team</td>
      <td style="padding:5px 10px;">${candidate.cellule}</td>
    </tr>
  </tbody>
</table>
<br>
<p class="text-left"> There is one more step to complete this process which is confirming your mail, it can be done by clicking the button bellow : </p>
<br>
<a href=${link}><img src="https://i.imgur.com/F3gvfU2.png" alt="click here" style="width: 20%;"></a>
</div>
</body
</html>`)
}




module.exports = { sendEmailToCandidate }
