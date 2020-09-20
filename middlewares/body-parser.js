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
                 req.body = JSON.parse(body)
                 resolve()
             })
         })
         await next()
     }
 }

 module.exports = bodyParser
