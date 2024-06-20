const supportedTypes = [
  "image/jpeg",
  "image/bmp",
  "image/gif",
  "image/jpg",
  "image/png",
];

const checkSupportedTypes = (filetype) => {
  let isSupported = false;

  for (let supportedType of supportedTypes)
    if (filetype === supportedType) {
      isSupported = true;
      break;
    }

  return isSupported;
};

export const helpers = {
  checkSupportedTypes,
};
