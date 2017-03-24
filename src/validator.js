var proto = require('../.tmp/proto.js');

module.exports = function Validator(converted) {
  return MESSAGE_PATH.verify(converted) === null;
};
