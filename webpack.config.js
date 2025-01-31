const path = require('path');

module.exports = [
  {
    entry: './renderer.tsx',
    context: __dirname,
    target: "electron-renderer",
    mode: "production",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    externals: [
      {
        "@freelensapp/extensions": "var global.LensExtensions",
        "react": "var global.React",
        "react-dom": "var global.ReactDOM",
        "mobx": "var global.Mobx",
        "mobx-react": "var global.MobxReact"
      }
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      libraryTarget: "commonjs2",
      globalObject: "this",
      filename: 'renderer.js',
      path: path.resolve(__dirname, 'dist'),
    },
    node: {
      __dirname: false,
      __filename: false
    }
  },
];
