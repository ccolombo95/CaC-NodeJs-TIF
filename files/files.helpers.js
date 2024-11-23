const supportedTypes = [
  "image/jpeg",
  "image/bmp",
  "image/gif",
  "image/jpg",
  "image/png",
];

const checkSupportedTypes = (filetype) => {
  return supportedTypes.includes(filetype);
};

export const helpers = {
  checkSupportedTypes,
};
