import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const signJWT = (user) => {
  const jwtPayload = {
    role: user.role,
    userId: user.id,
    username: user.username
  };

  return sign(jwtPayload, process.env.SECRET_KEY, { expiresIn: '24d' });
};

class CustomError extends Error {
  statusCode;
  message;
  error;
  validationErrors;

  constructor(statusCode, message, error, validationErrors) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.validationErrors = validationErrors;
  }
}

class GenericServerError extends CustomError {
  constructor(error) {
    super(500, 'Server Error', error);
  }
}

module.exports = {
  signJWT
};
