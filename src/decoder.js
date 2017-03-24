var decode = require(PROTO_FILE).MESSAGE_PATH.decode;

module.exports = function Decoder(bytes, port) {
    return decode(bytes, bytes.length);
};
