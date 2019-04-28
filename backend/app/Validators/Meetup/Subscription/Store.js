'use strict'

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator')

class MeetupSubscriptionStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      meetup_id: [rule('required')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = MeetupSubscriptionStore
