const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 添加本地别名解析
        '@flowcraft/shared': path.resolve(__dirname, '../shared/src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.module\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                api: 'modern', // 修复 API 配置
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern', // 修复 API 配置
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'designer',
        filename: 'remoteEntry.js',
        exposes: {
          './DesignerApp': './src/DesignerApp',
        },
        remotes: {
          // 暂时注释掉远程模块，使用本地别名
          // shared: isProduction
          //   ? 'shared@https://flowcraft-shared.netlify.app/remoteEntry.js'
          //   : 'shared@http://localhost:3001/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
          },
          'framer-motion': {
            singleton: true,
            requiredVersion: packageJson.dependencies?.['framer-motion'] || '^10.0.0',
          },
        },
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: 'FlowCraft Designer',
      }),
    ],

    devServer: {
      port: 3002,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};