// const express = require("express");
// const bodyParser = require("body-parser");
import express from "express";
import bodyParser from "body-parser";
import "@babel/polyfill";
// import webpackHotMiddleware from "webpack-hot-middleware";
// import webpackConfig from "webpack-hot-middleware";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "../client/App";
const app = express();
const port = 3001;
app.use(bodyParser.json());
// app.use(express.static);
app.use(express.static("build/public"));

app.get("*", (req, res) => {
  var title = "";
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta content="IE=edge" http-equiv="X-UA-Compatible">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <title>${title}</title>
      </head>
      <body>
          <div id="root">${markup}</div>
          <script src="client_bundle.js"></script>
      </body>
      </html>`;

  res.send(html);
});

app.listen(port, function () {
  console.log("Server listening to port 3001");
});
