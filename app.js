const Koa = require('koa');
const views = require('koa-views')
const koaBody = require('koa-body')
const router = require('./router')
const static = require('koa-static')

let app = new Koa();
app.use(views(__dirname + '/views', { extension: 'pug' }))
app.use(static(__dirname + '/static'))
app.use(koaBody({
    multipart: true //允许上传
}))

router(app)
// 监听端口
app.listen(3000, () => {
   console.log("my_demo_node服务器已启动，http://localhost:3000");
})