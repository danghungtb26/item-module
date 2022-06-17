import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

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
      '@db': path.resolve('src/db'),
      '@resque': path.resolve('src/resque'),
      '@models': path.resolve('src/db/models'),
    },
  },

  output: {
    path: path.resolve('dist'),
  },
}

export default config
