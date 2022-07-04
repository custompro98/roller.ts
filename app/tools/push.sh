#!/usr/bin/bash

git config user.name custompro98-ci
git config user.email mitchjoa@gmail.com
git add ./deno -f

if ! git diff --cached --exit-code > /dev/null;
then
  git commit -m "Build from GitHub Action $GITHUB_SHA"
  git push
else
  echo 'No changes to release'
fi
