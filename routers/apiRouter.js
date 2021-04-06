const Router = require('koa-router')
const homeController = require('../controller/homeContr')
const loginContr = require('../controller/loginContr')
const commentContr = require('../controller/commentContr')
const apiContr = require('../controller/apiContr')

let router = new Router({
    prefix: '/api'
})

//重定向
router.get('/', ctx => { ctx.redirect('/api/index') })

router.get('/index', homeController.index)
router.get('/home', homeController.home)
router.get('/getData', homeController.getData)
router.post('/addData', homeController.addData)
// router.get('/getIdTvShowData', homeController.getIdTvShowData)

//API相关
router.get('/getIdTvShowData', apiContr.getIdTvShowData)
router.get('/getIdSeasonEpData', apiContr.getIdSeasonEpData)
router.get('/getIdSeasonEpActorData', apiContr.getIdSeasonEpActorData)
router.get('/getIdSeasonTitleData', apiContr.getIdSeasonTitleData)//获取季度名和封面
router.get('/getIdTvShowActorData', apiContr.getIdTvShowActorData)//获取TvshowActor

//登录相关
router.get('/queryUser', loginContr.queryUser)
router.post('/addUser', loginContr.addUser)
router.get('/updateUser', loginContr.updateUser)
router.get('/checkUser', loginContr.checkUser)
router.get('/isLogin', loginContr.isLogin)

//评论相关
router.get('/queryComment', commentContr.queryComment)
router.get('/addComment', commentContr.addComment)
router.get('/updateComment', commentContr.updateComment)
router.get('/delComment', commentContr.delComment)

module.exports = router