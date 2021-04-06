// 数据操作
const mysql2 = require('mysql2');
const { createConnection } = require('net');
const { runInContext } = require('vm');
const connection = mysql2.createConnection({
      host: 'localhost',
      user: '',
      password: "",
      database: 'my_tv_info'
})

module.exports = {
    async querySql(addSql, addSqlParams) {
        return await query(addSql, addSqlParams)
    },
    async queryResIdSql(addSql, addSqlParams) {
        return await queryResId(addSql, addSqlParams)
    },
    
    async queryTotalCountSql(addSql, addSqlParams) {
        return await queryTotalCount(addSql, addSqlParams)
    },
    async insertSql(addSql, addSqlParams) {
        return await insertData(addSql, addSqlParams)
    },
    async updateSql(addSql, addSqlParams) {
        return await updateData(addSql, addSqlParams)
    },
    async deleteSql(addSql, addSqlParams) {
        return await deleteData(addSql, addSqlParams)
    }

}

function query(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                // console.log(err);
                rej(err)
            } else {
                var dataString = JSON.stringify(results);
                var data = JSON.parse(dataString);
                console.log('查询成功JSON：', data[0])
                res(data)
            }
        })
    })
}

function queryTotalCount(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                // console.log(err);
                rej(err)
            } else {
                //console.log('查询成功：', results[0])
                console.log('查询成功总数据：', results.length)
                res(results.length)
            }
        })
    })
}


function queryResId(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                // console.log(err);
                rej(err)
            } else {
                console.log('查询成功ID：', results)
                res(results)
            }
        })
    })
}

function insertData(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                //console.log(err);
                rej(err)
            } else {
                console.log('insertData成功：',results.insertId)
                res(results.insertId)
            }
        })
    })
}


function updateData(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                //console.log(err);
                rej(err)
            } else {
                console.log('updateData成功：',results)
                res(results)
            }
        })
    })
}


function deleteData(addSql, addSqlParams) {
    return new Promise((res, rej) => {
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err) {
                //console.log(err);
                rej(err)
            } else {
                console.log('deleteData成功：',results.insertId)
                res(results.insertId)
            }
        })
    })
}
