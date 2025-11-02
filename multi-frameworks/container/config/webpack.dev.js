const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
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

module.exports = merge(commonConfig, devConfig);
