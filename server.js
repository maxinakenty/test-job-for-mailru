const { join } = require('path');
const express = require('express');

const app = express();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const IS_DEVELOPMENT = require('./tools/constants');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;

if (IS_DEVELOPMENT) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/', (req, res) => {
    res.write(
      middleware.fileSystem.readFileSync(join(__dirname, 'public/index.html')),
    );
    res.end();
  });

  app.get('/mobile', (req, res) => {
    res.write(
      middleware.fileSystem.readFileSync(join(__dirname, 'public/mobile.html')),
    );
    res.end();
  });
} else {
  app.use(express.static(`${__dirname}/public/`));
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/public/index.html'));
  });

  app.get('/mobile', (req, res) => {
    res.sendFile(join(__dirname, 'public/mobile.html'));
  });
}

io.on('connection', socket => {
  socket.on('drive a car', direction => {
    io.emit('drive a car', direction);
  });
});

server.listen(PORT);
