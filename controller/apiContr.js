const ApiModel = require('../service/apiModel')

module.exports = {
    //根据ID获取tvshow数据
    async getIdTvShowData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let q = ctx.query.q || 1
        let s = ctx.query.s || '-1'
        let t = ctx.query.t || '0'

        let param = { tvId: q, tvSeasonId: s, tvSeasonImgTypeNumb: t, orderBy: '' }

        let resData = await ApiModel.getIdTvShowData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    },
    //根据ID获取分季分集tvshow按照ep排序
    async getIdSeasonEpData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let q = ctx.query.q || 1
        let s = ctx.query.s || 1

        let param = { tvId: q, tvSeasonId: s, orderBy: '' }

        let resData = await ApiModel.getIdSeasonEpData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    },
    //根据ID 
    async getIdSeasonEpActorData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        let q = ctx.query.q || 1

        let param = { tvSeasonId: q }

        let resData = await ApiModel.getIdSeasonEpActorData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    },
    //获取季度名和封面
    async getIdSeasonTitleData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


        let q = ctx.query.q || 1
        let t = 0

        let param = { tvSeasonId: q, tvSeasonImgTypeNumb: t }

        let resData = await ApiModel.getIdSeasonTitleData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    },
    //获取TvshowActor
    async getIdTvShowActorData(ctx) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


        let q = ctx.query.q || 1

        let param = { tvSeasonId: q }

        let resData = await ApiModel.getIdTvShowActorData(param).then((res, rej) => {
            return res
        })

        ctx.response.type = 'json';
        ctx.response.body = { resData }
    }
}