const commentService = require('../service/commentModel')
/**
 * 评论相关
 */
module.exports = {
    queryComment(ctx) {
        commentService.queryComments()
        ctx.body = '查询评论'
    },
   async addComment(ctx) {
         await commentService.addComments()
        ctx.body = '添加评论'
    },
    updateComment(ctx){
        commentService.updateComments()
        ctx.body = '更新评论'
    },
    delComment(ctx){
        commentService.delComments()
        ctx.body = '删除评论'
    }
}