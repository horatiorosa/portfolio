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
    })
  });
});

// vertify connection
transporter.verify(function (error, sucess) {
  if (error) {
    console.table('error', error);
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

