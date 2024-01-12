module.exports = {
    stories: ['../src/*.stories.mdx', '../src/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-styling',
        '@storybook/addon-styling-webpack',
        ({
          name: "@storybook/addon-styling-webpack",

          options: {
            rules: [{
          test: /\.css$/,
          sideEffects: true,
          use: [
              require.resolve("style-loader"),
              {
                  loader: require.resolve("css-loader"),
                  options: {
                      
                      importLoaders: 1,
                  },
              },{
        loader: require.resolve("postcss-loader"),
        options: {
        implementation: require.resolve("postcss"),
        },
        },
          ],
        },],
          }
        })
    ],
    framework: {
        name: '@storybook/html-webpack5',
        options: {}
    },
    docs: {
        autodocs: true
    },
    core: {
        disableTelemetry: true
    }
};
