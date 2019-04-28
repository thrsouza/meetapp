'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Preference = use('App/Models/Preference')

class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return response.status(201).send(user)
  }

  /**
   * Show user details.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async show ({ params, response, auth }) {
    const user = await auth.getUser()

    if (params.id !== user.id) {
      return response.status(401).send()
    }

    await user.loadMany(['preferences', 'preferences.theme'])

    return user
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(['name', 'password', 'preferences'])

    const sessionUser = await auth.getUser()

    if (params.id !== sessionUser.id) {
      return response.status(401).send()
    }

    const trx = await Database.beginTransaction()

    const user = await User.findOrFail(params.id)

    await user.load('preferences')

    await user
      .preferences()
      .transacting(trx)
      .delete()

    if (data.password) {
      user.password = data.password
    }

    user.name = data.name
    user.save(trx)

    await Preference.createMany(
      data.preferences.map(id => {
        return {
          user_id: sessionUser.id,
          theme_id: id
        }
      }),
      trx
    )

    trx.commit()
  }
}

module.exports = UserController
