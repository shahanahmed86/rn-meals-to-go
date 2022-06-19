module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.js', '*.jsx'],
        alias: {
          '@meals-to-go': './src',
        },
      },
    ],
    'jest-hoist',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
