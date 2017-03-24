#!/usr/bin/env bash
set -eu

REPO_DIR=$(git rev-parse --show-toplevel)

docker \
    run -it \
    -v `pwd`:`pwd` \
    -w `pwd` \
    wala/golang-otto \
    ./otto_cat.sh