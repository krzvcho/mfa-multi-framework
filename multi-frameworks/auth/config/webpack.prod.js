const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
//const packageJson = require('../package.json');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: {
        // Critical singletons - prevent multiple instances
        react: {
          singleton: true,
          requiredVersion: '18.3.1',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.3.1',
          eager: false,
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '5.3.4',
          eager: false,
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
