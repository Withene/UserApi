
const jwt = require('jsonwebtoken');
const Nodemailer = require('../emails/Nodemailer');

const User = require('./User');

require('dotenv').config({ path: '../.env' });

class PasswordToken {
  async create (email) {
    const user = await User.findByEmail(email);
    try {
      const token = await jwt.sign({ uuid: user.uuid }, user.password + process.env.JWTSCRETRECOVERY, { expiresIn: '1h' });

      Nodemailer.Send(token, email, user.uuid);

      return { error: false, token: token };
    } catch (error) {
      return { error: true, massage: 'Error on generate token' };
    }
  }

  async validate (token, uuid) {
    try {
      const user = await User.findByUuid(uuid);

      const data = jwt.verify(token, user.password + process.env.JWTSCRETRECOVERY);

      return { error: false, status: true, uuid: data.uuid };
    } catch (error) {
      return { error: true, status: false, catch: error };
    }
  }
}

module.exports = new PasswordToken();
