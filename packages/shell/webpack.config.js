const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/bootstrap.tsx', // 改为 bootstrap 入口点

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
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
          test: /\.scss$/,
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
                api: 'modern',
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
        name: 'shell',
        remotes: {
          shared: isProduction
            ? 'shared@https://flowcraft-shared.netlify.app/remoteEntry.js'
            : 'shared@http://localhost:3001/remoteEntry.js',
          designer: isProduction
            ? 'designer@https://flowcraft-designer.netlify.app/remoteEntry.js'
            : 'designer@http://localhost:3002/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
            eager: true, // 关键：改为 true
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
            eager: true, // 关键：改为 true
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-router-dom'],
            eager: false,
          },
          'framer-motion': {
            singleton: true,
            requiredVersion: packageJson.dependencies['framer-motion'],
            eager: false,
          },
          'lucide-react': {
            singleton: true,
            requiredVersion: packageJson.dependencies['lucide-react'],
            eager: false,
          },
          classnames: {
            singleton: true,
            requiredVersion: packageJson.dependencies.classnames,
            eager: false,
          },
        },
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: 'FlowCraft - 智能业务流程构建平台',
      }),
    ],

    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      },
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    optimization: {
      splitChunks: false, // 让 Module Federation 处理代码分割
    },
  };
};