#!/usr/bin/env bash
set -e

npm run clean

npm run build
cd dist/plus-pro-components
echo "publish plus-pro-components..."
npm publish
echo "Successfully published plus-pro-components"
cd -

cd packages/utils
echo "build utils..."
npm run build
echo "publish utils..."
npm publish
echo "Successfully published utils"
cd -

cd packages/resolver
echo "build resolver..."
npm run build
echo "publish resolver..."
npm publish
echo "Successfully published resolver"
cd -

cd packages/eslint-config
echo "build eslint-config..."
npm run build
echo "publish eslint-config..."
npm publish
echo "Successfully published eslint-config"
cd -

echo "✅ Publish completed"
exit
