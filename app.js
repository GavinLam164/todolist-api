const Koa = require('koa')
const path = require('path')
// const zlib = require('zlib')
// const bodyParser = require('koa-bodyparser')
const routes = require('./routes/routes')
const static = require('./middlewares/static')
const bodyParser = require('./middlewares/body-parser')

const app = new Koa()
// app.use(bodyParser())
app.use(bodyParser())
app.use(
        static(path.join(__dirname, 'public/'))
    )
    .use(routes)
    .listen(3000, (err) => {
        if (err) {
            throw err
        }
        console.log('success')
    })
