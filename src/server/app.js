'use strict';

import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import React from 'react'
import webpack from 'webpack'
import { renderToString } from 'react-dom/server'
import { match, createMemoryHistory } from 'react-router'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import Root from '../common/containers/Root'
import config from '../../config'
import routes from '../common/routes'
import configureStore from '../common/store/configureStore'
import rootSaga from '../common/sagas'
import controllers from './controllers'
import webpackconfig from '../../webpack/client.webpack.config.dev'

var serverConfig = config.serverConfig;

const app = express();

app.use(compression());
app.use(helmet());

var compiler = webpack(webpackconfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackconfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

app.use('/api', controllers);

const layout = (body, initialState) => (`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <title>${serverConfig.siteName}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/app.bundle.css" />
  </head>
  <body>
    <div id="root"><div>${body}</div></div>
    <script type="text/javascript" charset="utf-8">
      window.__INITIAL_STATE__ = ${initialState};
    </script>
    <script src="/assets/app.bundle.js"></script>
  </body>
  </html>
`);

app.use(function(req, res) {
  const store = configureStore();

  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const rootComp = <Root store={store} routes={routes} history={createMemoryHistory()} renderProps={renderProps} type="server"/>


      store.runSaga(rootSaga).done.then(() => {
        res.status(200).send(
          layout(
            renderToString(rootComp),
            JSON.stringify(store.getState())
          )
        )
      }).catch((e) => {
        console.log(e.message);
        res.status(500).send(e.message)
      });

      renderToString(rootComp);
      store.close();

    } else {
      res.status(404).send('Not found')
    }
  })
});

app.listen(serverConfig.port, (error)=>{
    if(error) throw error;

    console.info('==> ✅  %s is running', serverConfig.siteName);
    console.info(
        '==> 💻  Open http://%s:%s in a browser to view the app.',
        serverConfig.domain,
        serverConfig.port
    );
    console.info('press ctrl-C to stop application');
});

module.exports = app;
