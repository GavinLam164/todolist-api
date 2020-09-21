const Router = require('koa-router')
const Todo = require('../controller/todo')
const User = require('../controller/user')

const router = new Router()

router.get('/todo/list', Todo.list)
router.post('/todo/add', Todo.add)
router.post('/todo/update', Todo.update)
router.get('/todo/del', Todo.del)
router.get('/todo/find', Todo.find)

router.post('/user/register', User.register)
router.post('/user/login', User.login)

module.exports = router.routes()
