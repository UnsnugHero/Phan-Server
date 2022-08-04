const sign = require('jsonwebtoken').sign;

const signJWT = (user) => {
  const jwtPayload = {
    role: user.role,
    userId: user.id,
    username: user.username
  };

  return sign(jwtPayload, process.env.SECRET_KEY, { expiresIn: '24d' });
};

module.exports = signJWT;
