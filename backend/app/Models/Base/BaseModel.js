'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BaseModel extends Model {
  static boot () {
    super.boot()

    /**
     * A trait to provide an UUID before create
     * it to the database.
     */
    this.addTrait('UniqueID', { useCamelCase: true })
  }

  static formatDates (_, value) {
    return moment(value)
      .utc()
      .format('YYYY-MM-DD HH:mm:ssZZ')
  }
}

module.exports = BaseModel
