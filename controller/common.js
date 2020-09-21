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
