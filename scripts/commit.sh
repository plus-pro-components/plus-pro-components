#!/usr/bin/env bash
set -e

git add -A
pnpm run gitcz

git pull
git push

echo -e "\n\033[32mcommit success\033[0m"
