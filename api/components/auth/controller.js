const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLA = 'auth'
module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username })

    bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales === true) {
        return auth.sign(data)
      } else {
        throw new Error('Informacion Invalida')
      }
    })

    //     if (data.password === password) {
    //       //Gen token
    //       return auth.sign(data)
    //     } else {
    //       throw new Error('Informacion Invalida')
    //     }
    //     return data
    //   }

    async function upsert(data) {
      const authData = {
        id: data.id,
      }
      if (data.username) {
        authData.username = data.username
      }

      if (data.password) {
        authData.password = await bcript.hash(data.password, 6)
      }
      return store.upsert(TABLA, authData)
    }

    return {
      upsert,
      login,
    }
  }
}
