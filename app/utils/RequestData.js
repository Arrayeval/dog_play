var queryString = require('query-string')
var _ = require('lodash')

var config = require('./config')
var RequestData = {}

RequestData.get = function (url, params) {
    if (params) {
        url += '?' + queryString.stringify(params)
    }
    return fetch (url) 
            .then((response) => response.json())
}

RequestData.post = function (url, body) {
    var options = _.extend(config.header, {
        body: JSON.stringify(body)
    })
    return fetch(url, options)
            .then((response) => response.json())
}

export default RequestData