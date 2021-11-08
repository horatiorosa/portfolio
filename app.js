const path = require('path');
const express = require('express');
const cors = require("cors");
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

// instantiating express app
const webapp =  express();
// cors
// const whitelist = [
//   'http://localhost:5000/',
//   'localhost:5000/',
//   'https://test-and-debug-pws.herokuapp.com/',
//   'test-and-debug-pws.herokuapp.com/',
//   'https://horatiorosa.com/',
//   'http://horatiorosa.com/', 
//   'horatiorosa.com/'
//  ];

//  const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

webapp.use(cors({ origin: '*', credentials :  true }));

// webapp.use('/public',function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // Set to true if you need the website to include cookies in the requests sent
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });

webapp.use('/public', express.static(path.join(__dirname, 'public')));

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
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject ? data.subject : 'hello from your contact me form',
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
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

