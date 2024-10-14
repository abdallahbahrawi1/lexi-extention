const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/index.tsx'),
    content: path.resolve('src/content/index.tsx'),
    background: path.resolve('src/background/background.ts'),
  },
  module: {
    rules: [
      {
        // Add a rule for handling JavaScript and TypeScript files
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        // CSS handling, including Tailwind CSS and autoprefixer
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident:'postcss',
              plugins: [
                tailwindcss,
                autoprefixer,
              ],
            },
          },
        }],
        test: /\.css$/i,
      },
      {
        // Handle font files and images
        type: 'asset/resource',
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks(chunk){
        return chunk.name !== 'content';  // Exclude content script from splitting
      }
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },{
          from: path.resolve('src/content/content.css'),
          to: path.resolve('dist'),
        }
      ],
    }),

    ...getHtmlPlugins([ 
      'popup',
    ])
  ],
};

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlWebpackPlugin({
    title: 'React Extension',
    filename: `${chunk}.html`,
    chunks: [chunk],
  }));
}
