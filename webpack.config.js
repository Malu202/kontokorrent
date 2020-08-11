const HtmlWebpackPlugin = require("html-webpack-plugin");
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const { DefinePlugin } = require("webpack");

const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode == "production";
    const isGithubPages = env && env.githubpages;

    const environment = isGithubPages ? "'gh-pages'" : "'local'";

    const base = "/";
    return {
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
                },
                {
                    test: /favicons(\\|\/).+\.(svg|png|ico|xml|json)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'favicons/[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[contenthash].bundle.js',
            publicPath: base
        },
        plugins: [
            new HtmlWebpackPlugin({
                base: base, title: "Kontokorrent",
                template: 'src/index.html'
            }),
            new LicenseWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new CleanWebpackPlugin(),
            new ServiceWorkerWebpackPlugin({
                entry: path.join(__dirname, 'src/sw.ts'),
                publicPath: base
            }),
            new DefinePlugin({
                __ENVIRONMENT: environment
            })
        ],
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