#!/usr/bin/env bash
set -e

npm run build
cd dist/plus-pro-components
echo "publish plus-pro-components..."
npm publish
echo "Successfully published plus-pro-components"
cd -

cd dist/echarts
echo "publish echarts..."
npm publish
echo "Successfully published echarts"
cd -

cd packages/eslint-config
echo "publish eslint-config..."
npm publish
echo "Successfully published eslint-config"
cd -

cd packages/utils
echo "publish utils..."
npm run build
npm publish
echo "Successfully published utils"
cd -

echo "✅ Publish completed"
exit
