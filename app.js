
const Koa = require('koa')
const path = require('path')
// const zlib = require('zlib')
// const bodyParser = require('koa-bodyparser')
const routes = require('./routes/routes')
const static = require('./middlewares/static')

const bodyParser = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            const req = ctx.req
            const method = req.method
            if (method === 'get' || !ctx.is('application/json')) {
                return resolve()
            }
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', (err) => {
                if (err) {
                    return reject(err)
                }
                console.log('111111')
                req.body = JSON.parse(body)
                resolve()
            })
        })
        await next()
     }

}

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
