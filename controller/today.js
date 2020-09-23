const exec = require("../model").exec;
const common = require("./common");

exports.list = async (ctx) => {
    const {
        id
    } = ctx.state.user;
    const sql = `SELECT * FROM todolist_record
        WHERE user_id=${id}`;
    const res = await exec(sql);
    ctx.body = common.success(res);
};

exports.find = async (ctx) => {
    const {
        id
    } = ctx.query;
    const sql = `SELECT * FROM todolist_record
        WHERE id=${id}`;
    const res = await exec(sql);
    ctx.body = common.success(res[0]);
};

exports.recordList = async (ctx) => {
    const {
        id
    } = ctx.query;
    const sql = `SELECT * FROM todolist_record_cost
    WHERE record_id=${id}`;
    const res = await exec(sql);
    ctx.body = common.success(res);
};

exports.addCost = async (ctx) => {
    const {
        id: user_id
    } = ctx.state.user
    const {
        record_id,
        cost,
        message,
        file_path,
        start_time,
        end_time
    } = ctx.req.body
    const startDate = new Date(start_time)
    const start_time_str = `${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`
    const endDate = new Date(end_time)
    const end_time_str = `${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`
    let sql = `INSERT INTO todolist_record_cost values(
        NULL,
        ${user_id},
        ${record_id},
        ${cost},
        NULL,
        NULL,
        '${start_time_str}',
        '${end_time_str}'
    )`
    await exec(sql)

    const res = await exec(`SELECT total_cost FROM todolist_record WHERE id=${record_id}`)

    const {
        total_cost
    } = res[0]

    await exec(`UPDATE todolist_record SET total_cost=${total_cost+cost} WHERE id=${record_id}`)

    ctx.body = common.success()
};
