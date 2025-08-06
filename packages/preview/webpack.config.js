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
          test: /\.scss$/,
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
        name: 'preview',
        filename: 'remoteEntry.js',
        exposes: {
          './PreviewApp': './src/index.tsx',
        },
        remotes: {
          shared: isProduction
            ? 'shared@https://flowcraft-shared.netlify.app/remoteEntry.js'
            : 'shared@http://localhost:3001/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
            eager: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
            eager: true,
          },
        },
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: 'FlowCraft Preview',
      }),
    ],

    devServer: {
      port: 3003,
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
      splitChunks: false,
    },
  };
}; 