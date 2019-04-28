'use strict'

const BaseModel = require('./Base/BaseModel')

class Topic extends BaseModel {
  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }

  theme () {
    return this.belongsTo('App/Models/Theme')
  }
}

module.exports = Topic
