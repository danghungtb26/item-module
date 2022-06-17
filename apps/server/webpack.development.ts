import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { merge } from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

import Common from './webpack.common'

const config: Configuration = {
  mode: 'development',
  watch: true,

  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],

  plugins: [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()],
}

export default merge(Common, config)
