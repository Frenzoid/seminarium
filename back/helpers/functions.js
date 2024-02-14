const { BPMBLIMIT } = require('../config/general.js');
const bytes = require('bytes');

function errorHandler(fn) {
  return async (req, res, next) => {
    try {
      return await fn(req, res);
    }
    catch (err) {
      console.error(err);

      if (err.name === 'SequelizeValidationError'
        || err.name === 'SequelizeUniqueConstraintError'
        || err.name === 'AggregateError')
        return res.boom.badRequest(err.errors.map(e => e.message).join('\n'));

      return res.boom.badRequest(err.message || err.toString());
    }
  }
}

function checkBodySizeLimitMiddleware(req, res, next) {
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength) > bytes(BPMBLIMIT)) {
    return res.boom.badRequest(`Content size is too big. Max: ${BPMBLIMIT}`);
  }
  next();
};


module.exports = { errorHandler, checkBodySizeLimitMiddleware };