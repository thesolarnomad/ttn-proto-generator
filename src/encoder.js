var proto = require('../.tmp/proto.js');

function Encoder(object) {
  return MESSAGE_PATH.encode(MESSAGE_PATH.create(object)).finish();
}
Encoder.message = MESSAGE_PATH;

module.exports = Encoder;
