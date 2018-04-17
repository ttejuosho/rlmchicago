const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/', (req, res) => {
    const output = `
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.aol.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ttejuosho@aol.com", // generated ethereal user
            pass: "kpmgwgci1A" // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
    });


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"RLM Chicago" <ttejuosho@aol.com>', // sender address
        to: "ttejuosho@aol.com", // list of receivers
        subject: "Email Message From Your Website", // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        setTimeout(res.sendFile(path.join(__dirname, 'views/index.html')), 9000);
    });
});

app.listen(PORT, () => console.log('Server started...'));