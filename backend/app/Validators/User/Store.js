'use strict'

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator')

class UserStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      name: [rule('required')],
      email: [rule('required'), rule('email'), rule('unique', 'users')],
      password: [rule('required')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserStore
