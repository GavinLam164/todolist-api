const exec = require('../model').exec
const common = require('./common')

exports.list = async (ctx) => {
    const {
        id
    } = ctx.state.user
    const sql = `SELECT * FROM todolist_record
        WHERE user_id=${id}`
    const res = await exec(sql)
    ctx.body = common.success(res)
}

exports.find = async (ctx) => {
    const {
        id
    } = ctx.query
    const sql = `SELECT * FROM todolist_record
        WHERE id=${id}`
    const res = await exec(sql)
    ctx.body = common.success(res[0])
}

exports.recordList = async (ctx) => {
    const {
        id
    } = ctx.query
    const sql = `SELECT * FROM todolist_record_cost
    WHERE record_id=${id}`
    const res = await exec(sql)
    ctx.body = common.success(res)
}
