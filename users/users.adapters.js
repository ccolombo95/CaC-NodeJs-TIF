import User from "../models/User.js";

const parseUser = (data) => {
  const { name, surname, email, password, birthday, country, acuerdo } = data;
  const user = new User(
    name,
    surname,
    email,
    password,
    birthday,
    country,
    acuerdo
  );
  return user;
};

export const adapters = {
  parseUser,
};
