'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Preference = use('App/Models/Preference')

class SessionController {
  /**
   * Create/save a new session.
   * POST api/sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, auth }) {
    const { email, password } = request.all()

    const { token } = await auth.attempt(email, password)

    const user = await User.findByOrFail({ email })

    const preferencesCount = await Preference.query()
      .where({ user_id: user.id })
      .getCount()

    return { user, token, isFirstAccess: Number(preferencesCount) === 0 }
  }
}

module.exports = SessionController
