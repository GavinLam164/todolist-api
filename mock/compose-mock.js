
const co = require('./co-mock')

const a = function* (next) {
    console.log('before - a')
    yield next // 等待下一个middleware执行，即b函数先及执行
    console.log('after - a')
}

const b = function* (next) {
    console.log('before - b')
    yield next // 等待下一个middleware执行，即c函数先及执行
    console.log('after - b')
}

const c = function* (next) {
    console.log('c')
}

function* createGenerator (next) { // next函数执行用于创建promise
    const promise = next() // promise执行new过程
    return yield promise // 等待该promise执行结果
}

const middlewares = [
    a, b, c
].map(
    mw => (next) => co(mw.call(null, createGenerator(next))) // 将下一个middleware转为generator，并传递到当前middleware中，那么当前middleware执行时，可通过next调用下一个middleware
)

function compose (middlewares) {
    return function (next) {
        return dispatch(0)
        function dispatch (i) {
            const fn = middlewares[i]
            if (i === middlewares.length) {
                fn = next
            }
            if(!fn) return Promise.resolve()
            const res = fn(dispatch.bind(null, i + 1)) // 将下一个middleware的包装函数传入当前middleware中
            return Promise.resolve(res)
        }
    }
}

const fn = compose(middlewares)
fn()

