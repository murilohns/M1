const nodemailer = require('nodemailer');
const {
  host, port, user, pass,
} = require('../../config/mail');

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
  },
});

module.exports = options => transport.sendMail(options);
