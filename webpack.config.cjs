const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    characterCreate: './js/characterCreate.js',
    cookie: './js/cookie.js',
    customTypes: './js/customTypes.js',
    database: './js/database.js',
    homepage: './js/homepage.js',
    loginPage: './js/loginPage.js',
    devTesting: './js/devTesting.js',
    overview: './js/overview.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
};
