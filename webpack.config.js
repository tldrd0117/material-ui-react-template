const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    }
                }]
        
            },{
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            }
        ]
            
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        })
    ],
    resolve:{
        alias:{
            "@": path.resolve(__dirname, "src")
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true
    }
};

module.exports = (env, argv) => {
    if(argv.mode == "development"){
        return {
            ...config,
            devtool: "eval",
            watch: true
        }
    } else if(argv.mode == "production"){
        return {
            ...config
        }
    }
}