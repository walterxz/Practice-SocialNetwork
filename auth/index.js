const jwt = require('jsonwebtoken')
function sing(data) {
  return jwt.sing(data, 'secreto')
}
module.exports = {
  sing,
}
