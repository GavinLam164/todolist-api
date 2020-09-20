
const Router = require('koa-router')
const Todo = require('../controller/todo')

const router = new Router()

router.get('/list', Todo.list)
router.post('/add', Todo.add)
router.post('/update', Todo.update)
router.get('/del', Todo.del)
router.get('/find', Todo.find)

module.exports = router.routes()
