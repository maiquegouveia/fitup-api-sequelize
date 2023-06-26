const bcrypt = require("bcrypt");

exports.encrypt = (password) => {
  const result = bcrypt.hashSync(password, 10);
  return result;
};

exports.decrypt = (hash, password) => {
  const result = bcrypt.compareSync(password, hash);
  return result;
};
