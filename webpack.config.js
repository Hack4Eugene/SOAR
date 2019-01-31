const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const colors = require('colors');
const Router = require('./src/config/routes');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|ttf|gif)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=100&name=[hash].[ext]'
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }  
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            envConfig: process.env.CONFIG_ENV
        })
    ],
    resolve: {
        extensions: ['*', '.js']
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
    }
};

console.log(colors.blue(
`{
    ENVIRONMENT: {
        base: ${Router.serviceHost[process.env.CONFIG_ENV]},
        env: ${process.env.CONFIG_ENV}
    }
}`
));
if (!process.env.CONFIG_ENV) {
    console.log(
        colors.red(
            `       WARNING: You did not specify a CONFIG_ENV in your start command, 
                             default is local you will need to run the service locally from the '/node' directory
        `)
    )
}
