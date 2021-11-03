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
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

webapp.post('/send', (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function(err, fields) {
    console.table('fields', fields);
    Object.keys(fields).forEach(function(prop) {
      data[prop] = fields[prop].toString();
    });

    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject ? data.subject : 'hello from your contact me form',
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    console.log('mail', mail);

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log('error', err);
        res.status(500).send(`Something went wrong with the email. The error message is: ${err}`);
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

