import { db } from "./categories.dao.mysql.js";
import { adapters } from "./categories.adapter.js";

const getCategories = async (req, res) => {
  const result = await db.getCategories();
  res.json(result);
};

const createCategory = async (req, res) => {
  const category = adapters.categoryAdapter(req.body);
  const result = await db.createCategory(category);
  result ? res.redirect("/") : res.redirect("/");
};

const incomplete = (req, res) => {
  throw Error();
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = adapters.categoryAdapter(req.body);
  const result = await db.updateCategory(id, category);
  res.json(
    result
      ? { error_code: 0, desc: "Categoria modificado correctamente" }
      : { error_code: 3, error_desc: "Categoria inexistente" }
  );
};

const deleteCategory = async (req, res) => {
  const result = await db.deleteCategory(req.params.id);
  res.json(
    result
      ? { error_code: 0, desc: "Categoria borrado correctamente" }
      : { error_code: 3, error_desc: "Categoria inexistente" }
  );
};

export const controllers = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  incomplete,
};
