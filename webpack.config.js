import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async ({ mode } = {}) => {
  const config = (await import(`./webpack.${mode}.js`)).default;

  return {
    ...config,
    entry: './src/index.tsx',
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        title: `Title for ${mode} mode!`,
      }),
      new ESLintPlugin({
        extensions: ['.ts', '.tsx'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
    },
  };
};
