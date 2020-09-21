const exec = require("../model").exec;

exports.register = async (ctx) => {
    const {
        phone_number
    } = ctx.req.body

    const res = await exec(`SELECT * FROM t_user WHERE phone_number='${phone_number}'`)
    if (res) {
        ctx = '用户已存在'
        return
    }
}

exports.login = async (ctx) => {
    const {
        phone_number,
        password
    } = ctx.req.body
    const pwd = await exec(`
        SELECT password from t_user
            WHERE phone_number='${phone_number}'`)
    if (!pwd || pwd !== password) {
        ctx = '用户名或密码错误'
    } else {
        ctx = 'success'
    }
}
