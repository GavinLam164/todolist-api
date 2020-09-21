const exec = require("../model").exec;

exports.list = async (ctx) => {
    const res = await exec("select * from todolist")
    ctx.body = res
};

exports.add = async (ctx) => {
    const {
        todo_name,
        score = 0,
        start_time,
        end_time,
        hours = 0,
        user_id
    } = ctx.req.body
    const sql = `insert into todolist
        values(NULL,
            '${todo_name}',
            ${score},
            '${start_time}',
            '${end_time}',
            ${hours},
            ${user_id}
        )`;
    await exec(sql)
    ctx.body = "success"
};

exports.update = async (ctx) => {
    const {
        id,
        todo_name,
        score = 0,
        start_time,
        end_time,
        hours = 0,
        user_id
    } = ctx.req.body
    const sql = `update todolist set
        todo_name='${todo_name}',
        score=${score},
        start_time='${start_time}',
        end_time='${end_time}',
        hours=${hours},
        user_id=${user_id}
        where id=${id}`
    await exec(sql)
    ctx.body = "success"
};

exports.del = async (ctx) => {
    const {
        ids
    } = ctx.query
    const sql = `delete from todolist where id in(${ids})`
    await exec(sql)
    ctx.body = "success"
};

exports.find = async (ctx) => {
    const {
        id
    } = ctx.query
    const sql = `select * from todolist where id=${id}`
    const res = await exec(sql)
    ctx.body = res[0]
};
