const Router = require('koa-router')
const Todo = require('../controller/todo')
const Today = require('../controller/today')
const User = require('../controller/user')

const router = new Router()

router.get('/todo/list', Todo.list)
router.post('/todo/add', Todo.add)
router.post('/todo/update', Todo.update)
router.get('/todo/del', Todo.del)
router.get('/todo/find', Todo.find)

router.get('/today/list', Today.list)
router.get('/today/find', Today.find)
router.get('/today/recordList', Today.recordList)
router.post('/today/addCost', Today.addCost)

router.post('/user/register', User.register)
router.post('/user/login', User.login)

module.exports = router.routes()
