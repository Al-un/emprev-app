/**
 * Black magic webpack incantations taken from:
 * https://github.com/storybookjs/storybook/issues/2792
 */

// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require('path')

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.vue', '.scss', '.html')

  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src'),
  }

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    // Global SCSS: https://github.com/storybookjs/storybook/issues/6743#issuecomment-490822920
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          prependData: `@use "~@/styles/_includes.scss" as *;`,
        },
      },
    ],
  })

  // config.plugins.push(new ForkTsCheckerWebpackPlugin());

  return config
}
