require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const compression = require('compression')
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');

const { AppServerModuleNgFactory } = require('./dist/server/main');

enableProdMode();
const index = require('fs')
    .readFileSync(path.resolve(__dirname, './dist/ebooksden/index.html'), 'UTF-8')
    .toString();
let app = express()
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'ssr') {
  //let app = express();
  app.use(compression())
  
  app.get('**', function (req, res) {
    renderModuleFactory(AppServerModuleNgFactory, {
      url: req.path,
      document: index
    }).then(html => res.status(200).send(html));
  });

  app.get('/proxy', function (req, res) {
    renderModuleFactory(AppServerModuleNgFactory, {
      url: req.path,
      document: index
    }).then(html => res.status(200).send(html));
  });
}
exports.ssr = functions.https.onRequest(app);
