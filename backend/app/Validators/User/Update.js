'use strict'

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator')

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      name: [rule('required')],
      password: [rule('confirmed')],
      preferences: [rule('required'), rule('array')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
