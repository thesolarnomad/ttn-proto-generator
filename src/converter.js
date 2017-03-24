var toObject = require(PROTO_FILE).MESSAGE_PATH.toObject;

module.exports = function Converter(decoded, port) {
  return toObject(decoded, {
    enums: String,  // enums as string names
    defaults: true, // includes default values
  });
};
