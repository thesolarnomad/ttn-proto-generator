if (JSON.stringify(Encoder.message.AdsGain) !== JSON.stringify({"GAIN_EIGHT":8,"GAIN_FOUR":6,"GAIN_ONE":2,"GAIN_SIXTEEN":10,"GAIN_TWO":4,"GAIN_TWOTHIRDS":0})) {
    throw new Error('Nested Enum missing');
}

var encoded = Encoder({
    humidity: 22,
    gain: Encoder.message.AdsGain.GAIN_SIXTEEN
});
if (JSON.stringify(encoded) !== '[8,22,16,10]') {
    throw new Error('Encoder failed');
}

if (!Validator(encoded)) {
    throw new Error('Validator incorrect');
}

var decoded = Decoder(encoded);
if (JSON.stringify(decoded) !== JSON.stringify({"gain":"GAIN_SIXTEEN","humidity":22})) {
    throw new Error('Decoder failed');
}

var converted = Converter(decoded);
if (JSON.stringify(converted) !== JSON.stringify({"bla":{},"gain":"GAIN_SIXTEEN","gain2":"GAIN_TWOTHIRDS","humidity":22})) {
    throw new Error('Converter failed');
}