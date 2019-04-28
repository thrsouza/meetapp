'use strict'

const moment = require('moment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meetup = use('App/Models/Meetup')

class RecommendedController {
  /**
   * Show a list of all meetups (recommended).
   * GET meetups/recommended
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async index ({ request, auth }) {
    const { filter, page, limit } = request.all()

    const user = await auth.getUser()
    await user.loadMany(['preferences', 'subscriptions'])

    const preferences = await user.preferences().fetch()
    const preferencesFilter = preferences.rows.map(item => item.theme_id)

    const subscriptions = await user.subscriptions().fetch()
    const subscriptionsFilter = subscriptions.rows.map(item => item.meetup_id)

    let query = Meetup.query()
      .with('file')
      .where('when', '>', moment())
      .whereNot({ user_id: user.id })
      .whereNotIn('id', subscriptionsFilter)
      .whereHas('topics', builder =>
        builder.whereIn('theme_id', preferencesFilter)
      )

    if (filter) {
      query = query.where(
        Database.raw('LOWER("title") like ?', `%${filter.toLowerCase()}%`)
      )
    }

    query = query.withCount('subscriptions').orderBy('when', 'asc')

    const meetups = await query.paginate(page, limit)

    return meetups
  }
}

module.exports = RecommendedController
