const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx', // 改为 index.tsx 入口点

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
                api: 'modern',
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
        name: 'designer',
        filename: 'remoteEntry.js',
        exposes: {
          './DesignerApp': './src/DesignerApp',
          './MarketplacePage': './src/pages/MarketplacePage',
          './MarketplaceDetailsPage': './src/pages/MarketplaceDetailsPage',
          './VersionManagementPage': './src/pages/VersionManagementPage',
        },
        remotes: {
          // 启用远程模块
          shared: isProduction
            ? 'shared@https://flowcraft-shared.netlify.app/remoteEntry.js'
            : 'shared@http://localhost:3001/remoteEntry.js',
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
          'framer-motion': {
            singleton: true,
            requiredVersion: packageJson.dependencies['framer-motion'] || '^10.18.0',
            eager: false,
          },
          'lucide-react': {
            singleton: true,
            requiredVersion: packageJson.dependencies['lucide-react'] || '^0.263.1',
            eager: false,
          },
          classnames: {
            singleton: true,
            requiredVersion: packageJson.dependencies.classnames || '^2.5.1',
            eager: false,
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