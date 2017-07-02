import base, { defaultScssLoadersUse } from './webpack.config.base';

module.exports = base({
    scssLoader: config => [{ loader: 'style-loader' }, ...defaultScssLoadersUse(config)],
    moduleClassPattern: '[path][name]__[local]',
    entry: [
        'react-hot-loader/patch',
        __dirname + '/index.browser.js',
    ]
});