const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if token does not exist
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization denied!'
    });
  }

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);

    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is invalid!'
    });
  }
};
