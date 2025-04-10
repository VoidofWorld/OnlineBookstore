const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: 'index.js'  
    },
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({ filename: "styles.css" }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
          }), 
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
        ]
    },
    optimization: {
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
    } 
};