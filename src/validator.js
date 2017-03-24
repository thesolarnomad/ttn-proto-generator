var verify = require(PROTO_FILE).MESSAGE_PATH.verify;

module.exports = function Validator(converted, port) {
  return verify(converted) === null;
}
