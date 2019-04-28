'use strict'

const BaseModel = require('./Base/BaseModel')

class Preference extends BaseModel {
  user () {
    return this.belongsTo('App/Models/User')
  }

  theme () {
    return this.belongsTo('App/Models/Theme')
  }
}

module.exports = Preference
