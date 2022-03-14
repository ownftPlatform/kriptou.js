#!/bin/bash

npm run changelog

sed -i -e "s/-wenmoonmarket/.org/g" CHANGELOG.md
