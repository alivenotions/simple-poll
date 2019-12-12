import { join } from 'path'
import TerserPlugin from 'terser-webpack-plugin'

const include = join(__dirname, 'src')

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'simplePoll',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
          },
        }
      }
    ]
  }
}
