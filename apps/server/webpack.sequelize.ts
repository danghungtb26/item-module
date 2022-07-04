import path from 'path'
import { glob } from 'glob'
import nodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { Configuration } from 'webpack'

const route = ['db', 'container', 'controller', 'routes']

const aliases = route.reduce((a, b) => {
  return { ...a, [`@${b}`]: path.resolve(__dirname, `src/${b}`) }
}, {})

const config: Configuration = {
  entry: {
    ...glob.sync('src/db/migrations/*.ts').reduce((obj, el) => {
      // @ts-ignore
      obj[`migrations/${path.parse(el).name}`] = `./${el}`
      return obj
    }, {}),
    ...glob.sync('src/db/seeders/*.ts').reduce((obj, el) => {
      // @ts-ignore
      obj[`seeders/${path.parse(el).name}`] = `./${el}`
      return obj
    }, {}),
  },

  mode: 'production',

  devtool: false,

  optimization: {
    minimize: false,
  },

  target: 'node16',

  watchOptions: {
    ignored: /node_modules/,
  },

  externals: [
    nodeExternals(),
    {
      bcrypt: 'bcrypt',
      pg: 'pg',
    },
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve('src'),
      ...aliases,
    },
  },

  output: {
    path: path.resolve('./db'),
    library: {
      type: 'umd2',
    },
  },

  plugins: [new CleanWebpackPlugin()],
}

export default config
