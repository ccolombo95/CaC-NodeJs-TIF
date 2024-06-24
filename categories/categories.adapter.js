import Category from "../models/Category.js";

const categoryAdapter = (data) => {
  let { title, description, counter } = data;

  const product = new Category(title, description, counter);
  return category;
};

export const adapters = {
  categoryAdapter,
};
