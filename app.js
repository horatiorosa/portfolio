const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

// instantiating express app
const webapp = express();

// cors
webapp.use(cors({ origin: '*' }));

// make public static
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
  const form = new multiparty.Form();
  const data = {};
  form.parse(req, (err, fields) => {
    Object.keys(fields).forEach((prop) => {
      data[prop] = fields[prop].toString();
    });

    const mail = {
      from: `${data.name} <${data.email}>`,
      to: process.env.EMAIL,
      subject: `A ContactMe Message from ${data.name}`,
      text: `from: ${data.name} \n ${data.name}'s email: <${data.email}> \n message body: ${data.message}`,
      dsn: {
        id: `error with message" ${data.messageId}`,
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: process.env.EMAIL,
      },
      date: new Date().toLocaleString(),
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.status(500).send(`Something went wrong: ${err}`);
      } else {
        res.status(200).send(`email successfully sent to recipient: ${data.messageId}`);
      }
    });
  });
});

// vertify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('error', error);
  } else {
    console.log('Server is ready to receive messages');
  }
});

// set index page
webapp.route('/').get((req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

// testing port
const PORT = process.env.PORT || 5000;

webapp.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});
