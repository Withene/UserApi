const Jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
  // eslint-disable-next-line dot-notation
  const authToken = req.headers['authorization'];
  if (authToken !== undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];
    try {
      const data = Jwt.verify(token, process.env.JWTSCRET);
      req.loggedUser = { id: data.id, email: data.email };

      next();
    } catch (error) {
      res.status(403).json({ erro: true, message: error });
    }
  } else {
    res.status(403).json({ erro: true, message: 'You dont have permisson' });
  }
};
