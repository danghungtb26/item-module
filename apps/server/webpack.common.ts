import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

const route = ['db', 'container', 'controllers', 'routes']

const aliases = route.reduce((a, b) => {
  return { ...a, [`@${b}`]: path.resolve(__dirname, `src/${b}`) }
}, {})

const config: Configuration = {
  entry: {
    main: path.resolve('src/index.ts'),
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
    path: path.resolve('dist'),
  },
}

export default config
