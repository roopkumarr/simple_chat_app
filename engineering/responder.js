
const response = (res, code, message) => {
    return res.status(code).send(message)
}

module.exports.response = response;