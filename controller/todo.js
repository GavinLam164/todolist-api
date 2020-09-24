const exec = require("../model").exec;
const common = require("./common");
const moment = require("moment")

exports.list = async (ctx) => {
    const {
        id
    } = ctx.state.user
    const res = await exec(`select * from todolist where user_id=${id}`);
    ctx.body = common.success(res);
};

exports.add = async (ctx) => {
    let {
        todo_name,
        score = 0,
        start_time,
        end_time,
        hours = 0
    } = ctx.req.body;

    start_time = moment(start_time).format('YYYY-MM-DD')
    end_time = moment(end_time).format('YYYY-MM-DD')
    const {
        id
    } = ctx.state.user
    const sql = `insert into todolist
        values(NULL,
            '${todo_name}',
            ${score},
            '${start_time}',
            '${end_time}',
            ${hours},
            ${id}
        )`;
    const {
        insertId
    } = await exec(sql);

    const current_date = moment(new Date()).format('YYYY-MM-DD')
    const isBetween = moment(current_date).isBetween(start_time, end_time, null, '[]')
    if (isBetween) {
        const sql = `
        insert into todolist_record
            values(
                NULL,
                ${id},
                ${insertId},
                '${todo_name}',
                ${hours},
                0,
                '${current_date}'
            )`
        await exec(sql)
    }
    ctx.body = common.success();
};

exports.update = async (ctx) => {
    const {
        id,
        todo_name,
        score = 0,
        start_time,
        end_time,
        hours = 0,
    } = ctx.req.body;

    const sql = `update todolist set
        todo_name='${todo_name}',
        score=${score},
        start_time='${start_time}',
        end_time='${end_time}',
        hours=${hours}
        where id=${id}`;
    await exec(sql);
    ctx.body = common.success();
};

exports.del = async (ctx) => {
    const {
        ids
    } = ctx.query;
    let sql = `delete from todolist where id in(${ids})`;
    await exec(sql);
    sql = `delete from todolist_record where todo_id in(${ids})`
    await exec(sql)
    sql = `delete from todolist_record_cost where todo_id in(${ids})`
    await exec(sql)
    ctx.body = common.success();
};

exports.find = async (ctx) => {
    const {
        id
    } = ctx.query;
    const sql = `select * from todolist where id=${id}`;
    const res = await exec(sql);
    ctx.body = common.success(res[0]);
};
