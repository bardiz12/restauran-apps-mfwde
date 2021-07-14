const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { default: ImageminWebpackPlugin } = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const sharp = require('./sharp');

module.exports = {
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|png|jp(e*)g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images',
                    },
                }],
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/templates/index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: path.resolve(__dirname, 'dist/'),
                },
            ],
        }),
        new HtmlWebpackInlineSVGPlugin(),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('https://restaurant-api.dicoding.dev'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-restaurants-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 30 * 24 * 60 * 60,
                        },
                    },
                },
                {
                    urlPattern: ({ url }) => url.origin === 'https://use.fontawesome.com',
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'font-awesome',
                    },
                },
                {
                    urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'google-fonts-stylesheets',
                    },
                },
                {
                    urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-webfonts',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        expiration: {
                            maxEntries: 30,
                            maxAgeSeconds: 60 * 60 * 24 * 365,
                        },
                    },
                },
            ],
        }),
        new ImageminWebpackPlugin({
            plugins: [
                imageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
        }),
        {
            apply: (compiler) => {
                compiler.hooks.done.tap('Sharp all images', () => {
                    sharp.generateMenusImage();
                });
            },
        },
        new BundleAnalyzerPlugin(),
    ],
};
