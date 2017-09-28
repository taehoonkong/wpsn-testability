const express = require('express')
const morgan = require('morgan')
const bugsnag = require('bugsnag')

const createApiRouter = require('./router/api')

bugsnag.register(process.env.BUGSNAG_API_KEY);

module.exports = ({postMessage}) => {
  const app = express()

  app.use(bugsnag.requestHandler)
  app.set('trust proxy', true)
  app.use(morgan('tiny'))
  app.use('/api', createApiRouter({postMessage}))
  return app
}

process.on('unhandledRejection', function (err, promise) {
    console.error("Unhandled rejection: " + (err && err.stack || err));
    bugsnag.notify(err);
});
