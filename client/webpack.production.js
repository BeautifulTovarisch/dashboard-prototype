﻿const path = require( 'path' );
const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );

const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const commonConfig = require( './webpack.config' );

const productionConfig = {
    mode: 'production',
    output: {
        path: path.resolve( __dirname, './dist' ),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map'
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

module.exports = merge( commonConfig, productionConfig );
