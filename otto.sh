#!/usr/bin/env bash
set -eu

REPO_DIR=$(git rev-parse --show-toplevel)

docker \
    run -it \
    -v `pwd`:`pwd` \
    -w `pwd` \
    wala/golang-otto \
    cat \
        `pwd`/.tmp/Encoder.js \
        `pwd`/.tmp/Validator.js \
        `pwd`/.tmp/Converter.js \
        `pwd`/.tmp/Decoder.js \
        `pwd`/test/_otto.js | otto