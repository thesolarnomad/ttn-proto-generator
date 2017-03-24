var proto = require(PROTO_FILE);

module.exports = function Decoder(bytes) {
    return MESSAGE_PATH.decode(bytes, bytes.length);
};
