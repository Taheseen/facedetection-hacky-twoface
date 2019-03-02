const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        stream: './src/webcam-stream.js',
        settings: "./src/settings.js"
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webcam stream',
            template: 'src/index.html'
        }),

    new HtmlWebpackPlugin({
        hash: true,
        // title: 'My Awesome application',
        // myPageHeader: 'Settings',
        template: './src/settings.html',
        chunks: ['vendor', 'settings'],
        filename: './settings.html'
    })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist'
    }
};