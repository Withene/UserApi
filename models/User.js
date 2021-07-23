const bycrypt = require('bcrypt');
const validator = require('validator');
const knex = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

class User {
  async findAll () {
    try {
      const result = await knex.select(['id', 'name', 'email', 'uuid', 'role']).table('users');
      return result;
    } catch (error) {
      return [];
    }
  }

  async findById (id) {
    try {
      const result = await knex.select(['id', 'name', 'email', 'role']).where({ id }).table('users');

      if (result.length > 0) {
        return result[0];
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  async findByUuid (uuid) {
    try {
      const result = await knex.select('*').where({ uuid }).table('users');

      if (result.length > 0) {
        return result[0];
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  async newUser (email, password, name) {
    try {
      const hash = await bycrypt.hash(password, 12);
      const uuid = uuidv4();
      await knex.insert({ email, password: hash, name, role: 0, uuid: uuid }).table('users');
      return false;
    } catch (error) {
      return true;
    }
  }

  async findEmail (email) {
    try {
      const result = await knex.select('*').from('users').where({
        email
      });
      const leng = result.length > 0;
      return leng;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async validator (email, password, name) {
    if (email === undefined || email == null) {
      return true;
    }
    if (name === undefined || name == null) {
      return true;
    }
    if (password === undefined || password == null) {
      return true;
    }
    if (validator.isEmail(email) === false) {
      return true;
    }

    return false;
  }

  async update (id, email, name, role) {
    const user = await this.findById(id);

    if (user !== undefined) {
      const editUser = {};

      if (email !== undefined) {
        if (email !== user.email) {
          const result = await this.findEmail(email);

          if (!result) {
            editUser.email = email;
          } else {
            return { error: true, message: 'user email equals last email' };
          }
        } else {
          return { error: true, message: 'user email equals last email' };
        }
      } else {
        return { error: true, message: 'user not found' };
      }

      if (name !== undefined) {
        editUser.name = name;
      }
      if (role !== undefined) {
        editUser.role = role;
      }

      try {
        const resultQuery = await knex.update(editUser).where({ id }).table('users');
        if (resultQuery === 1) {
          return { error: false, message: 'updated data sucessful' };
        }
      } catch (error) {
        return { error: true, message: 'user not found' };
      }
    } else {
      return { error: true, message: 'user not found' };
    }
  }

  async delete (id) {
    const user = await this.findById(id);

    if (user !== undefined) {
      try {
        await knex.delete().where({ id }).table('users');
        return { error: false, message: 'user deleted' };
      } catch (error) {
        return { error: true, message: 'error when try delete user' };
      }
    } else {
      return { error: true, message: 'user not found' };
    }
  }

  async findByEmail (email) {
    try {
      const result = await knex.select('*').where({ email }).table('users');

      if (result.length > 0) {
        return result[0];
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  async changePassword (newPassword, uuid) {
    const hash = await bycrypt.hash(newPassword, 10);

    try {
      await knex.update({ password: hash }).where({ uuid }).table('users');
    } catch (error) {
      return { error: true, message: 'not possible reset password' };
    }
  }
}

module.exports = new User();
