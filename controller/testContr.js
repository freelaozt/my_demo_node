// 数据操作
const mysql2 = require('mysql2');
const connection = mysql2.createConnection({
    host: 'localhost',
    user: "root",
    password: "123456",
    database: "my_db_tvinfo"
})

const fs = require("fs")
let { readFile, readdir, writeFile } = require('../utils/fsPromise');//引入要使用的方法


module.exports = {
    async login(ctx) {
        ctx.response.type = 'json';
        ctx.response.body = { msg: 'Hello World', code: 1 }
    },
    async islogin(ctx) {
        ctx.response.type = 'json';
        ctx.response.body = { msg: 'Hello World', code: 0 }
    },
    async verify(ctx) {
        ctx.response.type = 'json';
        ctx.response.body = { msg: '验证码功能代写', code: 1 }
    },
    addSeasonInfo(ctx) {

        let p = ctx.query.p
        // readFilesEpisodeDetails(p)

        let selectPath = 'E:/2013 进击的巨人/Season 4'
        readContext(selectPath)

        function readContext(selectPath) {
            readdir(selectPath).then(result => {

                //把nfo看看有没有
                //console.log('1', result.filter(item => /\.nfo/i.test(item)))
                let currentResult = result.filter(item => /\.nfo/i.test(item))
                return currentResult

            }).then(result => {
                //get tvshow.nfo addDatabase
                result.forEach(item => {
                    let fileNfo = selectPath + '/' + item
                    console.log(fileNfo)
                    readFilesEpisodeDetails(p, fileNfo)
                })

            }).catch(err => {
                console.log(err)
            })

        }

        function readFilesEpisodeDetails(tv_id, fileNfo) {
            var data = fs.readFileSync(fileNfo);
            // console.log("同步读取: " + data.toString());
            var parseString = require('xml2js').parseString;
            parseString(data, {
                trim: true, explicitChildren: true, explicitArray: false,
                explicitCharkey: false, ignoreAttrs: false, mergeAttrs: true
            }, (err, result) => {

                let jsonData = JSON.parse(JSON.stringify(result, null, 2))
                // console.log(JSON.stringify(result, null, 2))
                let title = jsonData.episodedetails.title
                let originaltitle = jsonData.episodedetails.originaltitle
                let showtitle = jsonData.episodedetails.showtitle
                let season = jsonData.episodedetails.season
                let episode = jsonData.episodedetails.episode
                let rating = jsonData.episodedetails.rating
                let userrating = jsonData.episodedetails.userrating
                let votes = jsonData.episodedetails.votes
                let plot = jsonData.episodedetails.plot
                let runtime = jsonData.episodedetails.runtime
                let thumb = jsonData.episodedetails.thumb
                let mpaa = jsonData.episodedetails.mpaa
                let premiered = jsonData.episodedetails.premiered
                let aired = jsonData.episodedetails.aired
                let watched = jsonData.episodedetails.watched
                let playcount = jsonData.episodedetails.playcount
                let trailer = jsonData.episodedetails.trailer
                let dateadded = jsonData.episodedetails.dateadded
                let original_filename = jsonData.episodedetails.original_filename
                let user_note = jsonData.episodedetails.user_note
                let source = jsonData.episodedetails.source
                
                let studio = jsonData.episodedetails.studio
                if (typeof (studio) != 'undefined') {
                    if (typeof (studio) == 'string') {
                        studio = studio
                    }
                    if (typeof (studio) == 'object') {
                        studio.forEach(element => {
                            studio += element
                        });
                    }
                } else {
                    studio = ''
                }

                let credits = jsonData.episodedetails.credits
                if (typeof (credits) != 'undefined') {
                    if (typeof (credits) == 'string') {
                        credits = credits
                    }
                    if (typeof (credits) == 'object') {
                        credits.forEach(element => {
                            credits += element
                        });
                    }
                } else {
                    credits = ''
                }

                let director = jsonData.episodedetails.director
                if (typeof (director) != 'undefined') {
                    if (typeof (director) == 'string') {
                        credits = director
                    }
                    if (typeof (director) == 'object') {
                        director.forEach(element => {
                            director += element
                        });
                    }
                } else {
                    director = ''
                }

                let addSql = `INSERT INTO tv_season_episode 
                    (season,episode,title,originaltitle,showtitle,rating,userrating,
                        votes,plot,runtime,thumb,premiered,aired,watched,studio,
                        director,credits,mpaa,playcount,trailer,dateadded,source,
                        original_filename,user_note,tv_id)
                    VALUES ('${season}', '${episode}', '${title}', '${originaltitle}', '${showtitle}', '${rating}', '${userrating}',
                        '${votes}', '${plot}', '${runtime}', '${thumb}', '${premiered}', '${aired}', '${watched}', '${studio}',
                        '${director}', '${credits}', '${mpaa}', '${playcount}', '${trailer}', '${dateadded}',
                        '${source}', '${original_filename}', '${user_note}', '${tv_id}')`
                connection.query(addSql, (err, res) => {
                    if (err) {
                        return console.log(err);
                    }
                    let tv_se_id = res.insertId

                    insertEpisodeDetailsActor(tv_se_id)

                })

                function insertEpisodeDetailsActor(tv_se_id) {
                    let actor = jsonData.episodedetails.actor

                    if (typeof (actor) != 'undefined') {
                        //      
                        actor.forEach(element => {
                            let name = element.name
                            let role = element.role
                            let thumb = element.thumb
                            let profile = element.profile

                            try {
                                let addSql = `INSERT INTO tv_season_episode_actor (
                                                name,role,profile,thumb,tv_se_id
                                                ) VALUES (?,?,?,?,?)`
                                let addSqlParams = [name, role, profile, thumb, tv_se_id]
                                insert(addSql, addSqlParams)
                            } catch (error) {
                                console.log('insertEpisodeDetailsActor', error)
                            }
                        });
                    }
                }

            })
        }

        /**
         * 数据库操作
         * @param {*} addSql 
         * @param {*} addSqlParams 
         */
        function insert(addSql, addSqlParams) {
            return new Promise((res, rej) => {
                connection.query(addSql, addSqlParams, function (err, results) {
                    if (err) {
                        console.log(err);
                        rej(err)
                    } else {
                        console.log(results.insertId)
                        res(results.insertId)
                    }
                })
            })
        }
    }
}