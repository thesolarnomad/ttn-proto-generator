var proto = require(PROTO_FILE);

module.exports = function Converter(decoded) {
  return MESSAGE_PATH.toObject(decoded, {
    enums: String,  // enums as string names
    defaults: true, // includes default values
  });
};