require('dotenv').config({ path: '../.env' });
const transporter = require('../database/nodemailer');

class Nodemailer {
  async Send (token, email, uuid) {
    try {
      const sendEmail = await transporter.sendMail({
        from: process.env.FROM,
        to: email,
        subject: 'SevenDevz Recuperação de Senha Site! ',
        text: 'Olá estou testando',
        html: `<a href="${process.env.FROM}/changepassword/${token}/${uuid}"><button >Clique aqui para recuperar sua senha</button> </a>`
      });
      console.log(sendEmail.response);
      return { error: false };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  }
}

module.exports = new Nodemailer();
