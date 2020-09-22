const common = require('../controller/common')

module.exports = () => {
    return async (ctx, next) => {
        const token = ctx.cookies.get('token')
        if (token) {
            const userInfoJson = await common.cacheGet(token)
            ctx.state.user = JSON.parse(userInfoJson)
        }
        await next()
    }
}
