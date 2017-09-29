
const nodemailer = require('nodemailer');

const htmlSource = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body style="text-align:center;">
	<h1>This is an image of Stellenbosch:</h1>
	<img src="cid:anyt3xTy0uw@ntgoeshere" width="250" height="250" />
</body>
</html>`

// enter your own details here
var mailOptions = {
	from: 'noreply',
	to: 'recipient.name@email.net',
    subject: 'Embedded image Test ' + Date(),
    text: 'Fallback message goes here',
    html: htmlSource,
    attachments: [{
        filename: 'Vue_du_vignoble_de_Stellenbosch.jpg',
        path: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Vue_du_vignoble_de_Stellenbosch.jpg',
        cid: 'anyt3xTy0uw@ntgoeshere' // same cid value as in the html img src
    }]
};

// enter your own details here
var smtpConfig = {
    host: 'smtp.yourmail.net',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'yourusername',
        pass: 'yourpassword'
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

transporter.sendMail(mailOptions, (err) => {
    if (err) {
        console.info('Error sending message')
        console.warn('' + err);
    } else {
        console.error('Message sent')
    }
});

