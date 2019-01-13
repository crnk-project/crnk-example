#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" -a "$TRAVIS_PULL_REQUEST" == "false" ]; then
  ./gradlew jib
else
  echo "Skip deploying";
fi