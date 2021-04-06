const homeModel = require('../service/homeModel')
const nf = require('node-fetch')

module.exports = {
    async index(ctx) {
        // ctx.response.type = 'json';
        // ctx.response.body = { data: 'Hello World' }
        let totalCount = await homeModel.getTotal().then((res, rej) => {
            return res
        })
        var results = {
            status: 'success',
            totalRows: totalCount,
            resData: `数据返回${totalCount}，数据库链接成功`
        };
        ctx.response.type = 'json';
        ctx.response.body = { results }
    },
    async home(ctx) {
        await ctx.render('./index.html')
        //ctx.body = 'api-Home'
    },
    async getData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let p = ctx.query.p || 1
        //'一页20条', perPage
        let perPage = 20
        let totalCount = await homeModel.getTotal().then((res, rej) => {
            return res
        })
        let pCount = Math.ceil(totalCount / perPage)
        console.log('总页数', pCount)
        let resData = await homeModel.getData(p, perPage).then((res, rej) => {
            return res
        })
        var results = {
            perPage: perPage,
            totalRows: totalCount,
            resData: resData
        };

        ctx.response.type = 'json';
        ctx.response.body = { results }
    },
    async addData(ctx) {
        console.log(ctx.request.body)
        console.log(ctx.request.files)
        await homeModel.addData(ctx.request)
        ctx.body = 'some value...'
    },
    async getIdTvShowData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let q = ctx.query.q || 1
        let param = { q: q }

        let resData = await homeModel.getIdTvShowData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    }
}