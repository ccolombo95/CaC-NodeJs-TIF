export const config = {
  secretKey: process.env.SECRET_KEY,
  token: {
    expiresIn: process.env.TOKEN_EXPIRATION,
  },
  cookie: {
    maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10),
    httpOnly: true,
    signed: true,
  },
};
