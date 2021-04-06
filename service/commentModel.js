const sqlOperation = require('../utils/sqlOperation')

module.exports = {
    queryComments() { console.log('查询评论') },
    async addComments() {
        let sql = `INSERT INTO tv_comment (tv_id,comment_content,comment_time,user_id) VALUES (
            ?,?,?,?)`
        let sqlParam = [1,'this is a comment','',1]
        await sqlOperation.insertSql(sql, sqlParam)
        console.log('添加评论')
    },
    updateComments() { console.log('更新评论') },
    delComments() { console.log('删除评论') }
}
