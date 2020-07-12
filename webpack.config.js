const HtmlWebpackPlugin = require('html-webpack-plugin');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts',
        styles: "./src/styles.scss"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: {} },
                    { loader: "postcss-loader", options: {} },
                    {
                        loader: "sass-loader", options: {
                            implementation: require('sass'), sassOptions: {
                                includePaths: ["node_modules"],
                            },
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[contenthash].bundle.js',
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({ base: "/", title: "Kontokorrent" }),
    new LicenseWebpackPlugin(),
    new MiniCssExtractPlugin()],
    mode: "development",
    devServer: {
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: "/"
        }
    }
};