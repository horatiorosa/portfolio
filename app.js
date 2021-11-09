const path = require('path');
const express = require('express');
const cors = require("cors");
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

// instantiating express app
const webapp =  express();
// cors
webapp.use(cors({ origin: "*" }));

// webapp.use('./public', express.static(process.cwd() + './public')); //make public static
webapp.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  host: 'smtp.dreamhost.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

webapp.post('/send', (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function(err, fields) {
    Object.keys(fields).forEach(function(prop) {
      data[prop] = fields[prop].toString();
    });
    
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: process.env.EMAIL,
      subject: `${data.subject}` ? `${data.subject}` : `hello from your ${data.name}`,
      text: `from: ${data.name} \n ${data.name}'s email: <${data.email}> \n message body: ${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.status(500).send(`Something went wrong: ${err}`);
      } else {
        res.status(200).send(`Email successfully sent to recipient!`);
      }
    });
  });
});

// vertify connection
transporter.verify(function (error, success) {
  if (error) {
    console.log('error', error);
  } else {
    console.log('Server is ready to receive messages');
  }
});


// set index page
webapp.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

// testing port
const PORT = process.env.PORT || 5000;

webapp.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});

