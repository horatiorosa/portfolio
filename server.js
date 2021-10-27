const express = require('express');
const cors = require("cors");
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

// instantiating express app
const webapp =  express();
// cors
webapp.use(cors({ origin: "*" }));

webapp.use('./public', express.static(process.cwd() + './public')); //make public static

// set index page
webapp.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

// testing port
const PORT = process.env.PORT || 5000;

webapp.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});

