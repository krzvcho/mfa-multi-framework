const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    output: {
        publicPath: 'auto',
    },
    devServer: {
        port: 8080,
        hot: false,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                productsApp: 'products@http://localhost:8081/remoteEntry.js',
                cartApp: 'cart@http://localhost:8083/remoteEntry.js'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};