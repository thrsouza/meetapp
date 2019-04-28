'use strict'

class UniqueID {
  register (Model) {
    /**
     * A hook to provide an UUID before create
     * it to the database.
     */
    Model.addHook('beforeCreate', async modelInstance => {
      modelInstance.id = require('uuid').v4()
    })
  }
}

module.exports = UniqueID
