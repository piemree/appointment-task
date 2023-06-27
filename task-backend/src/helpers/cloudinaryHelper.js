const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dwhyenvtu",
  api_key: "912145598789372",
  api_secret: "O-KbmiXAhw81rqE2n481Jwde_uo",
});

module.exports.uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath);
};
