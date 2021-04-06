/**
 * 总路由：分管路由
 */
const apiRouter = require('./routers/apiRouter')

module.exports = function (app) {
    app.use(apiRouter.routes())
}