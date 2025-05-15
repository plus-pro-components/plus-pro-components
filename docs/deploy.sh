#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd .vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/plus-pro-components/plus-pro-components.github.io.git master:gh-pages

rsync -av --exclude=".*" ./ root@47.109.84.50:/root/plus-pro-components

cd -
