const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')

const CracoLessPlugin = require('craco-less')

const packages = []
// packages.push(path.join(__dirname, '../../packages/model'))
// packages.push(path.join(__dirname, '../../packages/api'))

const route = ['components', 'pages', 'hooks', 'layouts', 'routes', 'themes', 'apis', 'models']

const aliases = route.reduce((a, b) => {
  return { ...a, [`@${b}`]: path.resolve(__dirname, `src/${b}`) }
}, {})

module.exports = {
  devServer: {
    proxy: {
      '/api/**': {
        target: process.env.API_HOST,
        pathRewrite: { '^/api': '' },
        secure: false,
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      ...aliases,
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
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4D8BD6',
              '@link-color': '#4D8BD6',
              '@border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
