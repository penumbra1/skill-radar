const CracoAntDesignPlugin = require("craco-antd");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

// Remove the alias once the icon issue is fixed
// https://github.com/ant-design/ant-design/issues/12011

module.exports = {
  webpack: {
    plugins: [new BundleAnalyzerPlugin({ openAnalyzer: false })],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            "primary-color": "#7B6477",
            "font-family": "Roboto",
            "font-size-base": "16px",
            "font-size-sm": "14px"
          },
          javascriptEnabled: true
        }
      }
    }
  ]
};
