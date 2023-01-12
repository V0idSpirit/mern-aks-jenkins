const path = require('path');
const webpack = require('webpack');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.ENVIRONMENT': JSON.stringify('development'),
  'process.env.MONGOOSE_DB_LINK': JSON.stringify('mongodb+srv://test:<password>@cluster0.t92sqmh.mongodb.net/?retryWrites=true&w=majority')
};

if (environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.MONGOOSE_DB_LINK': JSON.stringify('mongodb+srv://test:<password>@cluster0.t92sqmh.mongodb.net/?retryWrites=true&w=majority')
  };
} else if (environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('production'),
    'process.env.PORT': JSON.stringify('80'),
    'process.env.MMONGOOSE_DB_LINK': JSON.stringify('mongodb+srv://test:<password>@cluster0.t92sqmh.mongodb.net/?retryWrites=true&w=majority')
  };
}

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
  ],
};