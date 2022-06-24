const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')

const packages = []
// packages.push(path.join(__dirname, '../../packages/model'))
// packages.push(path.join(__dirname, '../../packages/api'))

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include]

        match.loader.include = include.concat(packages)
      }

      return webpackConfig
    },
  },
  plugins: [],
}
