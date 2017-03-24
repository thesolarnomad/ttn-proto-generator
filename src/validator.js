var proto = require(PROTO_FILE);

module.exports = function Validator(converted) {
  return MESSAGE_PATH.verify(converted) === null;
}
