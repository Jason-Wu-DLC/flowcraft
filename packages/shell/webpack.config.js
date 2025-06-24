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
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
            eager: true, // 添加 eager 消费
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
            eager: true, // 添加 eager 消费
          },
          // 添加 react-router-dom 共享配置
          'react-router-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-router-dom'],
            eager: false, // 设为 false 避免 eager consumption 错误
          },
          // 添加其他依赖
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
      // 添加静态文件服务
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      },
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    // 添加优化配置
    optimization: {
      splitChunks: {
        chunks: 'async',
        cacheGroups: {
          shared: {
            name: 'shared',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };
};