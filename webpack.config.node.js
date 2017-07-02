import base, { defaultScssLoadersUse } from './webpack.config.base';

module.exports = base({
    target: 'node',
    entry: __dirname + '/index.js',
    filename: 'index.js',
    path: __dirname + '/dist/node',
    scssLoader: config => [
        require.resolve("./webpack/cssLocalsLoader"),
        ...defaultScssLoadersUse(config),
    ],
});