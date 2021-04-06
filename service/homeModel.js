const sqlOperation = require('../utils/sqlOperation')
const fs = require("fs")

module.exports = {
    async getData(p, perPage) {
        let addSqlTest = `SELECT tv_all_show.id,tv_all_show.title, tv_season.season_number,tv_season.season_img FROM tv_all_show ,tv_season WHERE tv_all_show.id = tv_season.tv_id And tv_season.season_number = '-1' LIMIT ${(p - 1) * perPage},${perPage}`
        let addSql = `select * from tv_all_show LIMIT ${(p - 1) * perPage},${perPage}`
        let addSqlParams = ['']

        return await sqlOperation.querySql(addSqlTest, addSqlParams)
    },
    async getTotal() {
        let addSqlTest = `SELECT tv_all_show.title, tv_season.season_number,tv_season.season_img FROM tv_all_show ,tv_season WHERE tv_all_show.id = tv_season.tv_id And tv_season.season_number = '-1'`
        let addSql = `select * from tv_all_show`
        let addSqlParams = ['']

        return await sqlOperation.queryTotalCountSql(addSqlTest, addSqlParams)

        // other way
        // let [rows] = await connection.promise().query('select * from tv_all_show')
        // return rows.length
    },
    addData(request) {
        let { fname, lname } = request.body
        if (request.files.img.size > 0) {
            // 转存到指定文件夹
            if (!fs.existsSync('static/uploads')) {
                fs.mkdirSync('static/uploads')
            }
        }
        let tempPath = request.files.img.path
        fs.writeFileSync('static/uploads/' + request.files.img.name, fs.readFileSync(tempPath))
        let imgUrl = '/uploads/' + request.files.img.name
        console.log(fname)
        console.log(lname)
        console.log(imgUrl)
        // 数据添加到数据库
        //let [rows] = connection.promise().query('')
        return ''
    },
    async getIdTvShowData(param){
        let { q } = param

        let addSql = `select * from tv_all_show WHERE id = ${q}`
        let addSqlParams = ['']
        return await sqlOperation.querySql(addSql, addSqlParams)
    }
}
