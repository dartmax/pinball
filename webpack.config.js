const path = require('path')
const Dotenv = require('dotenv-webpack');
const fs = require("fs");

module.exports = {
    devtool: "source-map",
    entry: {
        main:path.resolve(__dirname, 'root'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.gif$/,
                type: 'asset/inline',
            },
            {
                test: /\.(ttf|eot|svg|ico|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    resolve: {
        fallback: {
            fs: false,
        },
        alias: {
            config$: './configs/app-config.js',
            react: './vendor/react-master',
        },
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules',
        ],
    },
    target: 'node',
    plugins: [
        new Dotenv({
            path: './.env',
            safe: true,
            allowEmptyValues: true,
            systemvars: true,
            silent: true,
            defaults: false,
        })
    ]
}