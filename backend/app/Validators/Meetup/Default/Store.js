'use strict'

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator')

class MeetupDefaultStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      file_id: [rule('required')],
      title: [rule('required')],
      description: [rule('required')],
      where: [rule('required')],
      when: [rule('required'), rule('date_format', 'YYYY-MM-DD HH:mm:ss')],
      topics: [rule('required'), rule('array')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = MeetupDefaultStore
