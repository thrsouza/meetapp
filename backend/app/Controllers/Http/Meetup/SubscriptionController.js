'use strict'

const moment = require('moment')
const momentLocale = require('moment/locale/pt-br')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meetup = use('App/Models/Meetup')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Subscription = use('App/Models/Subscription')

const kue = use('Kue')
const newSubscriptionMailJob = use('App/Jobs/NewSubscriptionMail')

class SubscriptionController {
  /**
   * Show a list of all meetups (subscribed).
   * GET meetups/subscriptions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async index ({ request, auth }) {
    const { filter, page, limit } = request.all()

    const user = await auth.getUser()
    await user.load('subscriptions')

    const subscriptions = await user.subscriptions().fetch()
    const subscriptionsFilter = subscriptions.rows.map(item => item.meetup_id)

    let query = Meetup.query()
      .with('file')
      .where('when', '>', moment())
      .whereIn('id', subscriptionsFilter)

    if (filter) {
      query = query.where(
        Database.raw('LOWER("title") like ?', `%${filter.toLowerCase()}%`)
      )
    }

    query = query.withCount('subscriptions').orderBy('when', 'asc')

    const meetups = await query.paginate(page, limit)

    return meetups
  }

  /**
   * Create/save a new subscription.
   * POST meetups/subscriptions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, response, auth }) {
    const { meetup_id: meetupId } = request.only(['meetup_id'])

    const user = await auth.getUser()

    const subscriptions = await Subscription.query()
      .where({ user_id: user.id })
      .where({ meetup_id: meetupId })
      .fetch()

    if (subscriptions.size() > 0) {
      return response.status(409).send()
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetupId
    })

    const meetup = await Meetup.findOrFail(meetupId)
    await meetup.load('file')

    const file = await meetup.file().firstOrFail()

    const data = {
      email: user.email,
      username: user.name,
      title: meetup.title,
      description: meetup.description,
      where: meetup.where,
      when: moment(meetup.when)
        .utc()
        .locale('pt-br', momentLocale)
        .format('LLL'),
      bannerUrl: file.getUrl(file)
    }

    kue.dispatch(newSubscriptionMailJob.key, data, { attempts: 3 })

    return subscription
  }

  /**
   * Remove a subscription.
   * POST meetups/subscriptions
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async destroy ({ params, response, auth }) {
    const user = await auth.getUser()

    await Subscription.query()
      .where({ user_id: user.id })
      .where({ meetup_id: params.id })
      .delete()

    return response.status(200).send()
  }
}

module.exports = SubscriptionController
