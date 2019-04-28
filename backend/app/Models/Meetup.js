'use strict'

const BaseModel = require('./Base/BaseModel')

class Meetup extends BaseModel {
  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }

  topics () {
    return this.hasMany('App/Models/Topic')
  }

  subscriptions () {
    return this.hasMany('App/Models/Subscription')
  }
}

module.exports = Meetup
