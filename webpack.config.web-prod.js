import base, { defaultScssLoadersUse } from './webpack.config.base';

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = base({
    publicPath: 'assets/',
    scssLoader: config => ExtractTextPlugin.extract({
        use: defaultScssLoadersUse(config)
    }),

    plugins: [
        new ExtractTextPlugin("styles.[hash].css"),
    ]
});

console.log(module.exports.module.rules[1].use);