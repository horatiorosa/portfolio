const express = require('express');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

// instantiating express app
const webapp =  express();

webapp.route('/').get(function(req, res) {
  res.sendFile(process.cwd) + '/index.html';
});

// testing port
const PORT = process.env.PORT || 5000;

webapp.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});

