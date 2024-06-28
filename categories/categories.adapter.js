import Category from "../models/Category.js";

const categoryAdapter = (data) => {
  const { title, description } = data;

  return new Category(title, description);
};

export const adapters = {
  categoryAdapter,
};
