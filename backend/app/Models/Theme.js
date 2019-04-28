'use strict'

const BaseModel = require('./Base/BaseModel')

class Theme extends BaseModel {
  preferences () {
    return this.hasMany('App/Models/Preference')
  }

  topics () {
    return this.hasMany('App/Models/Topic')
  }
}

module.exports = Theme
