import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'

import Common from './webpack.common'

const config: Configuration = {
  mode: 'production',
  devtool: 'source-map',

  plugins: [new CleanWebpackPlugin()],
}

export default merge(Common, config)
