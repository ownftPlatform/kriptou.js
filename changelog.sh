#!/bin/bash

npm run changelog

sed -i -e "s/-kr1p70n1c/.com/g" CHANGELOG.md
