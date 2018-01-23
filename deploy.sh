#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" -a "$TRAVIS_PULL_REQUEST" == "false" ]; then
  ./gradlew dockerPushImage
else
  echo "Skip deploying";
fi