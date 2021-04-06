const sqlOperation = require('../utils/sqlOperation')

module.exports = {
    queryUser() {
        console.log('查询用户')
    },
    async addUser(request) {
        let { username, password } = request.body
        let head_img, status, regtime = ''
        console.log('添加用户', username, password)
        let sql = `INSERT INTO tv_user (head_img,username,password,status,regtime) VALUES (
                ?,?,?,?,?)`
        let sqlParam = [head_img, username, password, status, regtime]
        await sqlOperation.insertSql(sql, sqlParam)
    },
    async updateUser(param) {
        let { name, pwd } = param
        let sql = `SELECT * FROM tv_user WHERE username = '${name}'`

        console.log(sql)
        let sqlParam = []
        let [rows] = await sqlOperation.queryResIdSql(sql, sqlParam)
        console.log('更新用户', rows.id)
        if (rows.id != '') {
            let sql = `UPDATE tv_user SET username = '${name}', password = '${pwd}' WHERE id = '${rows.id}'`
            let sqlParam = ['']
            await sqlOperation.updateSql(sql, sqlParam)
        }
    },
    delUser() {
        console.log('删除用户')
    },
    async checkUser(param) {

        let { name, pwd } = param
        let sql = `SELECT * FROM tv_user WHERE username = '${name}' AND password ='${pwd}'`

        let sqlParam = []
        let [rows] = await sqlOperation.queryResIdSql(sql, sqlParam)
        return [rows]
    }
}