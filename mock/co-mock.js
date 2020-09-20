function co(gen) {
    return new Promise((resolve, reject) => {
        if (typeof gen === 'function') {
            gen = gen()
        }
        if (!gen || typeof gen.next !== 'function') {
            return resolve(gen)
        }
        onFulfilled()

        function next(ret) {
            if (ret.done) {
                return resolve(ret.value)
            }
            const value = co(ret.value)
            value.then(onFulfilled)
        }

        function onFulfilled(res) {
            const ret = gen.next(res)
            next(ret)
        }

    })
}

function* a() {
    console.log('a')
    return 'a'
}

function* b() {
    console.log('b')
    return 'b'
}

function* gen() {
    let res = yield a()
    console.log(res)
    res = yield b()
    console.log(res)
    return 'c'
}
function test () {
    co(gen)
        .then((res) => {
            console.log(res)
        })
}

module.exports = co
