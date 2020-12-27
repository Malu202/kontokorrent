const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode == "production";
    const environment = (env ? env.environment : null) || "local";
    const analyze = env && env.analyze;

    const base = {
        "gh-pages": "/",
        "local": "/",
        "gh-pagesv2": "/v2/"
    }[environment];
    return {
        target: "web",
        entry: {
            index: './src/index.ts'
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    exclude: /index\.html$/,
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
                        {
                            loader: "css-loader", options: {

                            }
                        },
                        { loader: "postcss-loader", options: {} },
                        {
                            loader: "sass-loader", options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    includePaths: ["node_modules"],
                                },
                            }
                        }
                    ]
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[contenthash].bundle.js',
            publicPath: base,
            globalObject: "self"
        },
        plugins: [
            new HtmlWebpackPlugin({
                base: base, title: "Kontokorrent",
                template: 'src/index.html',
                inject: false
            }),
            new LicenseCheckerWebpackPlugin({
                outputFilename: "licenses.txt",
                allow: "(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC)"
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new CleanWebpackPlugin(),
            new DefinePlugin({
                __ENVIRONMENT: `"${environment}"`
            }),
            new CopyPlugin({
                patterns: [
                    { from: './favicons', to: 'favicons' },
                    { from: './src/site.webmanifest', to: './' },
                ],
            }),
            new InjectManifest({
                swSrc: "./src/sw.ts"
            }),
            ...(analyze ? [new BundleAnalyzerPlugin()] : [])
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        mode: "development",
        devServer: {
            compress: true,
            port: 9000,
            historyApiFallback: {
                index: "/"
            }
        }
    };
}