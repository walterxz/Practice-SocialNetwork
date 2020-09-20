//Exportacion de controladores y Base de datos
const store = require('../../../store/dummy')
const ctrl = require('./controller')

module.exports = ctrl(store)
