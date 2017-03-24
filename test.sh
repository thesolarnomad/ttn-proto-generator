#!/usr/bin/env bash
set -eu

docker \
    run -it \
    -v `pwd`:`pwd` \
    -w `pwd` \
    wala/golang-otto \
    cat `pwd`/tmp/Decoder.js `pwd`/test/test.js | otto