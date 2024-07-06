const seconds = 60;
const minutes = 60;
const hours = 24;

export const config = {
  secretKey: "nikito",
  token: {
    expiresIn: `${hours}h`,
  },
  cookie: {
    maxAge: seconds * minutes * hours * 1000,
    httpOnly: true,
    signed: true,
  },
};
