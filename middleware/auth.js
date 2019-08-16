const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-access-token');

  // Check if token does not exist
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization denied!'
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is invalid!'
    });
  }
};
