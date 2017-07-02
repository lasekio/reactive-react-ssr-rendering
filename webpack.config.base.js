var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var _path = require('path');

export const defaultScssLoadersUse = ({ moduleClassPattern, cssLoader = 'css-loader' }) => [
    {
        loader: cssLoader,
        options: {
            modules: true,
            localIdentName: moduleClassPattern,
        }
    }, {
        loader: "sass-loader"
    }
];

export default ({
    moduleClassPattern = '[hash:base64:5]',
    publicPath = '',
    lastStageCssLoader = { loader: 'style-loader' },
    filename = 'app.[hash].js',
    entry = __dirname + '/index.browser.js',
    target = 'web',
    path = __dirname + '/dist/browser',
    plugins = [],
    scssLoader = defaultScssLoadersUse
}) => {
    return {
        entry,
        target,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.s?css$/,
                    use: scssLoader({
                        moduleClassPattern,
                        lastStageCssLoader
                    }),
                }
            ]
        },
        resolve: {
            alias: {
                style: _path.resolve(__dirname, 'src/utils/style/style.web.js'),
            }
        },
        output: {
            path,
            publicPath,
            filename
        },
        plugins: [
            ...plugins,
            new HtmlWebpackPlugin({
                template: 'src/index.html.ejs',
            }),
            new webpack.DefinePlugin({
                'process.env.GITHUB_API_KEY': JSON.stringify(process.env.GITHUB_API_KEY),
                '__SERVER__': JSON.stringify(false),
                '__BROWSER__': JSON.stringify(true),
            })
        ]
    }
}