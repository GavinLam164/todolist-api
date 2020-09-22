const redis = require("redis");

exports.success = (data, message = '') => ({
    code: 200,
    data,
    message
})

exports.error = ({
    code,
    message = ''
}) => ({
    code,
    data: null,
    message
})

const openCache = () => {
    return new Promise((resolve, reject) => {
        const client = redis.createClient({
            host: "localhost",
            port: "6379",
        });
        client.on("ready", resolve.bind(null, client));
        client.on("error", reject);
    });
};

const clientGet = (client, key, defualtValue) => new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
        if (err) {
            return reject(err)
        }
        resolve(value || defualtValue)
    })
})

exports.cacheGet = async (key, defualtValue) => {
    const client = await openCache()
    const value = await clientGet(client, key, defualtValue)
    return value
};

exports.cacheSet = async (key, value) => {
    const client = await openCache()
    client.set(key, JSON.stringify(value))
}
