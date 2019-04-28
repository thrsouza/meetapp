'use strict'

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator')

class SessionStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: [rule('required'), rule('email')],
      password: [rule('required')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = SessionStore
