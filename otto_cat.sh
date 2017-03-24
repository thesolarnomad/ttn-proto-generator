#!/usr/bin/env bash
set -eu

cat \
    `pwd`/.tmp/Encoder.js \
    `pwd`/.tmp/Validator.js \
    `pwd`/.tmp/Converter.js \
    `pwd`/.tmp/Decoder.js \
    `pwd`/test/_otto.js | otto