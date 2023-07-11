const { defineConfig } = require("@vue/cli-service");
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
// 引入插件
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillWebpackPlugin(),
      ComponentsPlugin({ resolvers: [VantResolver()] }),
    ],
  },
});
