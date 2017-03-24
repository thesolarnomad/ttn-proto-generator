var proto = require('../.tmp/proto.js');

module.exports = function Decoder(bytes) {
  return MESSAGE_PATH.decode(bytes, bytes.length);
};
