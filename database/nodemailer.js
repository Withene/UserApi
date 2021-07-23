require('dotenv').config({ path: '../.env' });
const Mailer = require('nodemailer');

const transporter = Mailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

module.exports = transporter;
