import Startup from "../models/Startup.js";

const startupAdapter = (data, files = {}) => {
  let bannerImage = data.banner || "";
  let photo1Image = data.photo1 || "";
  let photo2Image = data.photo2 || "";

  // Verificar si se subieron las imágenes en los campos correctos
  if (files.banner && files.banner[0]) {
    bannerImage = "/assets/img/" + files.banner[0].filename;
  }
  if (files.photo1 && files.photo1[0]) {
    photo1Image = "/assets/img/" + files.photo1[0].filename;
  }
  if (files.photo2 && files.photo2[0]) {
    photo2Image = "/assets/img/" + files.photo2[0].filename;
  }

  const {
    name,
    slogan,
    description,
    owner,
    phone,
    mail,
    website,
    facebook,
    instagram,
    text1,
    text2,
    text3,
  } = data;

  const startup = new Startup(
    name,
    slogan,
    description,
    owner,
    phone,
    mail,
    website,
    facebook,
    instagram,
    bannerImage,
    photo1Image,
    photo2Image,
    text1,
    text2,
    text3
  );

  return startup;
};

export const adapters = {
  startupAdapter,
};
