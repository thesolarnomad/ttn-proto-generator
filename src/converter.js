var proto = require('../tmp/proto.js');

module.exports = function Converter(decoded) {
  return MESSAGE_PATH.toObject(decoded, {
    enums: String,  // enums as string names
    defaults: true, // includes default values
    bytes: String,  // bytes as base64 encoded strings
    arrays: true,   // populates empty arrays (repeated fields)
    objects: true,  // populates empty objects (map fields)
  });
};