
const fs = require('fs')
const path = require('path')

const readFileStat = (subPath) => {
    return new Promise((resolve, reject) => {
        fs.stat(subPath, (err, st) => {
            if (err) {
                return reject(err)
            }
            resolve(st)
        })
    })
}

module.exports = (relativePath) => {
    return async (ctx, next) => {
        subPath = await next()
        if (!subPath || typeof subPath !== 'string') {
            return
        }
        subPath = relativePath + subPath
        const {
            size
        } = await readFileStat(subPath)
        ctx.type = path.extname(subPath)
        ctx.body = fs.createReadStream(subPath)
        ctx.response.set('Content-Length', size)
    }
}
