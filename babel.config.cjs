module.exports = {
  // presets: [
  //   // ['@babel/preset-env', { targets: { esmodules: true, node: 'current' } }],
  //   ['@babel/preset-env'],
  //   ['@babel/preset-react', { runtime: 'automatic' }],
  // ],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ],
};
