'use strict'

const Env = use('Env')
const Mail = use('Mail')

class NewSubscriptionMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewSubscriptionMail-job'
  }

  // This is where the work is done.
  async handle (data) {
    console.log(`Job: ${NewSubscriptionMail.key}`)

    await Mail.send(['emails.new_subscription'], data, message => {
      message
        .to(data.email)
        .from(
          Env.get('DEFAULT_MAIL_SENDER_EMAIL'),
          Env.get('DEFAULT_MAIL_SENDER_NAME')
        )
        .subject(
          `${Env.get('DEFAULT_MAIL_SUBJECT_NEW_SUBSCRIPTION')}: ${data.title}`
        )
    })
  }
}

module.exports = NewSubscriptionMail
