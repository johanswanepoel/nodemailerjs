const nodemailer = require('nodemailer');

const htmlSource = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Nodemailer Example</title>
</head>
<body style="text-align:center;">
    <p>An example implementation of the nodemailer package to send images using CIDs</p>
	<h1>This is an image of Stellenbosch:</h1>
	<img src="cid:anyt3xTy0uw@ntgoeshere" width="250" height="250" />
</body>
</html>`;

// enter your own details here
const mailOptions = {
  from: 'noreply',
  to: 'johan.swanepoel@hearxgroup.com',
  subject: 'Embedded image Test ' + Date(),
  text: 'Fallback message goes here',
  html: htmlSource,
  attachments: [
    {
      filename: 'Vue_du_vignoble_de_Stellenbosch.jpg',
      path:
        'https://upload.wikimedia.org/wikipedia/commons/6/6b/Vue_du_vignoble_de_Stellenbosch.jpg',
      cid: 'anyt3xTy0uw@ntgoeshere', // same cid value as in the html img src
    },
  ],
};

// enter your own details here
const smtpConfig = {
  host: 'smtp.gmail.com', // replace with yours
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'johans.jurie@gmail.com',
    pass: 'Hierdieismygooglewagwoord.1',
  },
};

async function getFakeSmtp() {
    const testAccount = await nodemailer.createTestAccount();
    const fakeSmtp = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    };
    
    return fakeSmtp;
}

async function send(options, smtp) {
/* Only needed if you don't have a real mail account for testing */
    const fakeSmtp = await getFakeSmtp();
    // smtp = fakeSmtp;

  let transporter = nodemailer.createTransport(smtp);

  transporter.sendMail(options, err => {
    if (err) {
      return console.error('Error sending message', err);
    }
    
      console.log('Message sent!');
    
  });
}

send(mailOptions, smtpConfig);
   
