const moment = require('moment')

let now = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

module.exprts = {
    now: now
}