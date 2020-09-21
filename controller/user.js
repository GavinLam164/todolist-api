const exec = require("../model").exec;
const common = require('./common')

exports.register = async (ctx) => {
    const {
        phone_number,
        nick_name,
        password,
        gender
    } = ctx.req.body

    const res = await exec(`
        SELECT * FROM t_user
            WHERE phone_number='${phone_number}'`)
    if (res.length > 0) {
        ctx.body = common.error({
            code: 3001,
            message: '用户已存在'
        })
        return
    }

    await exec(`
        INSERT INTO t_user
        VALUES(NULL, '${nick_name}', '${phone_number}', '${password}', ${gender})`)

    ctx.body = common.success()
}

exports.login = async (ctx) => {
    const {
        phone_number,
        password
    } = ctx.req.body
    const res = await exec(`
        SELECT password from t_user
            WHERE phone_number='${phone_number}'`)
    const pwd = res[0].password
    if (!pwd || pwd !== password) {
        ctx.body = common.error({
            code: 3002,
            message: '用户名或密码错误'
        })
    } else {
        ctx.body = common.success()
    }
}
