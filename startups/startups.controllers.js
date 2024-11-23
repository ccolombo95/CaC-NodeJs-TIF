import { db } from "./startups.dao.mysql.js";
import { adapters } from "./startups.adapter.js";

const getStartups = async (req, res) => {
  const result = await db.getStartups();

  res.json(result);
};
const getStartup = async (req, res) => {
  try {
    const result = await db.getStartup(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Startupnot found" });
    }
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createStartup = async (req, res) => {
  try {
    const startup = adapters.startupAdapter(req.body, req.files);
    const result = await db.createStartup(startup);

    if (result) {
      res.redirect("./admin/startups.html");
    } else {
      res.status(400).redirect("./admin/startups.html");
    }
  } catch (error) {
    console.error("Error creating startup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const incomplete = (req, res) => {
  throw Error();
};

const updateStartup = async (req, res) => {
  const { id } = req.params;

  // Si no se proporcionan nuevas imágenes, usar las que están en el body
  if (!req.files && req.body.image) {
    req.files = {
      banner: [{ filename: req.body.image.replace("/assets/img/", "") }],
    };
  }

  const startup = adapters.startupAdapter(req.body, req.files); // Corregido a `req.files`
  const result = await db.updateStartup(id, startup);

  res.json(
    result
      ? { error_code: 0, desc: "Emprendimiento modificado correctamente" }
      : { error_code: 3, error_desc: "Emprendimiento inexistente" }
  );
};

const deleteStartup = async (req, res) => {
  const result = await db.deleteStartup(req.params.id);

  res.json(
    result
      ? { error_code: 0, desc: "Emprendimiento borrado correctamente" }
      : { error_code: 3, error_desc: "Emprendimiento inexistente" }
  );
};

export const controllers = {
  getStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
  incomplete,
};
