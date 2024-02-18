"use server";
// const util = require("util");
const jwt = require("jsonwebtoken");
export const verify = async (token) => {
  let id;
  jwt.verify(token, process.env.JWT_STRING, function (err, decoded) {
    if (err) {
      throw err;
    } else {
      console.log(decoded);
    }
  });
};
