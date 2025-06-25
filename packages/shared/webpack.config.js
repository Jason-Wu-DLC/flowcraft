const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    target: 'web',

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: 'auto',
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
                configFile: path.resolve(__dirname, 'tsconfig.json')
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
                api: 'modern', // 确保所有 sass-loader 都有 api 配置
                sassOptions: {
                  outputStyle: 'expanded',
                },
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
                api: 'modern', // 确保所有 sass-loader 都有 api 配置
                sassOptions: {
                  outputStyle: 'expanded',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'shared',
        filename: 'remoteEntry.js',
        exposes: {
          './components': './src/components/index.ts',
          './themes': './src/themes/index.ts',
          './hooks': './src/hooks/index.ts',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
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
        filename: 'index.html',
        title: 'FlowCraft Shared Components',
        templateContent: `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FlowCraft Shared Components</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
        `,
      }),
    ],

    devServer: {
      port: 3001,
      hot: true,
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    optimization: {
      splitChunks: false,
    },
  };
};