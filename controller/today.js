const exec = require("../model").exec;
const common = require("./common");
const moment = require('moment')

exports.list = async (ctx) => {
    const {
        id
    } = ctx.state.user;
    const start_time_str = moment(new Date()).format('YYYY-MM-DD')
    const sql = `SELECT * FROM todolist_record
        WHERE user_id=${id}
        AND \`current_date\` LIKE '${start_time_str}'
        `;
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
        end_time,
        todo_id
    } = ctx.req.body
    const startDate = moment(start_time).format('HH:mm:ss')
    const endDate = moment(end_time).format('HH:mm:ss')
    let sql = `INSERT INTO todolist_record_cost values(
        NULL,
        ${user_id},
        ${record_id},
        ${todo_id},
        ${cost},
        NULL,
        NULL,
        '${startDate}',
        '${endDate}'
    )`
    await exec(sql)

    const res = await exec(`SELECT total_cost FROM todolist_record WHERE id=${record_id}`)

    const {
        total_cost
    } = res[0]

    await exec(`UPDATE todolist_record SET total_cost=${total_cost+cost} WHERE id=${record_id}`)

    ctx.body = common.success()
};
