'use strict'

const BaseModel = require('./Base/BaseModel')

class Subscription extends BaseModel {
  user () {
    return this.belongsTo('App/Models/User')
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = Subscription
