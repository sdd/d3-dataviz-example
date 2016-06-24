const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        'bootstrap-loader',
        './src/index.js',
        'rc-slider/assets/index.css',
        './styles/style.css'
    ],

    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: 'cheap-module-source-map',

    resolve: { extensions: [ '', '.js' ] },

    module: {

        preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" }],

        loaders: [
            { test: /.js$/, exclude: /node_modules/, loader: 'react-hot!babel' },

            // the following are only necessary due to usage of react-bootstrap
            { test: /\.css$/, loaders: [ 'style', 'css' ] },
            { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000" },
            { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file' },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin()
    ],

    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true
    }
};

module.exports = config;
