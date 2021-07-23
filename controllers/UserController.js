const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');
require('dotenv').config();

class UserController {
  async index (req, res) {
    const userResult = await User.findAll();
    res.json(userResult);
  }

  async findUser (req, res) {
    const { id } = req.params;
    const result = await User.findById(id);

    if (result === undefined) {
      res.status(404).json({ error: true, message: 'User not found' });
    } else {
      res.status(200).json(result);
    }
  }

  async create (req, res) {
    const { email, name, password } = req.body;

    const validate = await User.validator(email, name, password);

    if (validate) {
      return res.status(400).json({ error: true, message: 'Lack of data for create user' });
    }

    const findResult = await User.findEmail(email);

    if (findResult) {
      return res.status(400).json({ error: true, message: 'Have one account with this Email' });
    }

    const NewUser = await User.newUser(email, password, name);

    if (!NewUser) {
      res.status(200).json({ error: false, message: 'User Create' });
    } else {
      res.status(406).json({ error: true, message: 'Error on create user' });
    }
  }

  async edit (req, res) {
    const { id, name, role, email } = req.body;

    const edit = await User.update(id, email, name, role);
    if (edit.error === false) {
      res.status(200).json(edit);
    } else {
      res.status(406).json(edit);
    }
  }

  async delete (req, res) {
    const { id } = req.params;

    const result = await User.delete(id);

    if (result.error !== true) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  }

  async recoveryPassword (req, res) {
    const { email } = req.body;

    const result = await PasswordToken.create(email);

    if (result.error !== true) {
      res.status(200).json(result);
    } else {
      res.status(406).json(result);
    }
  }

  async changePassword (req, res) {
    const token = req.params.token;
    const uuid = req.params.uuid;

    const { password } = req.body;

    const isTokenValid = await PasswordToken.validate(token, uuid);

    if (isTokenValid.status) {
      await User.changePassword(password, isTokenValid.uuid);

      res.status(200).json({ token: 'sucessful operation' });
    } else {
      res.status(406).json({ token: 'Error on token,Please create another' });
    }
  }

  async login (req, res) {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (user !== undefined) {
      const result = await bycrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWTSCRET, { expiresIn: '1h' });

        res.status(200).json({ erro: false, token });
      } else {
        res.status(406).json({ erro: true, message: 'incorrect credentials' });
      }
    } else {
      res.status(406).json({ erro: true, message: 'not found user' });
    }
  }
}

module.exports = new UserController();
