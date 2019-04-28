'use strict'

const BaseModel = require('./Base/BaseModel')

class User extends BaseModel {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  preferences () {
    return this.hasMany('App/Models/Preference')
  }

  meetups () {
    return this.hasMany('App/Models/Meetup')
  }

  subscriptions () {
    return this.hasMany('App/Models/Subscription')
  }
}

module.exports = User
