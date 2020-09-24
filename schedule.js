const schedule = require('node-schedule')
const model = require('./model')
const moment = require('moment')

module.exports = () => {

    schedule.scheduleJob('1 0 * * *', async () => {
        const res = await model.exec(`
            SELECT * FROM todolist t
                WHERE TO_DAYS(t.start_time) <= TO_DAYS(NOW())
                AND TO_DAYS(t.end_time) >= TO_DAYS(NOW())`)
        const all = res.map((row) => new Promise((resolve, reject) => {
            const {
                todo_name,
                id: todo_id,
                user_id,
                hours,
            } = row
            const total_cost = 0
            const current_date = moment(new Date()).format('YYYY-MM-DD')
            const sql = `
            insert into todolist_record
                values(
                    NULL,
                    ${user_id},
                    ${todo_id},
                    '${todo_name}',
                    ${hours},
                    ${total_cost},
                    '${current_date}'
                )`
            model.exec(sql).then(resolve)
        }))
        await Promise.all(all)
        console.log('插入成功')
    });
}
