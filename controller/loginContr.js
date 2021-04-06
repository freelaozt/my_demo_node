/**
 * 管理登录
 */
const loginService = require('../service/loginModel')
const md5 = require('md5')

module.exports = {
    queryUser(ctx) {
        let name = ctx.query.n || ''
        if (name = '') {
            return
        }
        loginService.queryUser()
        ctx.body = '查询用户'
    },
    async addUser(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        await loginService.addUser(ctx.request)
        ctx.body = '添加用户'
    },
    async updateUser(ctx) {
        let name = ctx.query.n || ''
        let pwd = ctx.query.p || ''
        let param = { 'name': name, 'pwd': pwd }
        await loginService.updateUser(param)
        ctx.body = '更新用户'
    },
    async checkUser(ctx) {
        /**
         * 检查用户名和密码是否和数据库
         * 在存入cookie
         */
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let name = ctx.query.n || ''
        let pwd = ctx.query.p || ''
        let param = { 'name': name, 'pwd': pwd }

        let result = await loginService.checkUser(param)
        
        let results = {}
       
        try {
             // 存在
            console.log(result[0].id)
            results = {
                user: name,
                pwd: pwd,
                code: 200,
                status: 'success'
            };
        } catch (error) {
            results = {
                user: name,
                pwd: pwd,
                code: 404,
                status: 'error'
            };
            console.log(error)
        }
       

        ctx.response.type = 'json';
        ctx.response.body = { results }
    },
    /**
     * 检查clientCookies是否和存储cookies一致
     */
    isLogin(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let name = ctx.query.n || ''
        let pwd = ctx.query.p || ''
       
        ctx.response.type = 'json';
        ctx.response.body = { results }
    },
}