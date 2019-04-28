'use strict'

const moment = require('moment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meetup = use('App/Models/Meetup')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Subscription = use('App/Models/Subscription')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Topic = use('App/Models/Topic')

const Database = use('Database')

class DefaultController {
  /**
   * Create/save a new meetup.
   * POST meetups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, response, auth }) {
    const { topics } = request.only(['topics'])
    const data = request.only([
      'title',
      'description',
      'file_id',
      'where',
      'when'
    ])

    const user = await auth.getUser()

    const trx = await Database.beginTransaction()

    const meetup = await Meetup.create({ ...data, user_id: user.id }, trx)

    await Topic.createMany(
      topics.map(topic => ({
        meetup_id: meetup.id,
        theme_id: topic
      })),
      trx
    )

    await Subscription.create(
      {
        meetup_id: meetup.id,
        user_id: user.id
      },
      trx
    )

    trx.commit()

    await meetup.loadMany(['file', 'topics'])

    return response.status(201).send(meetup)
  }

  /**
   * Show a list of all meetups (organized).
   * GET meetups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async index ({ request, auth }) {
    const { page, limit } = request.all()

    const user = await auth.getUser()

    let query = Meetup.query().where({ user_id: user.id })

    const meetups = await query
      .where('when', '>', moment())
      .with('file')
      .withCount('subscriptions')
      .orderBy('when', 'asc')
      .paginate(page, limit)

    return meetups
  }

  /**
   * Display a single meetup.
   * GET meetups/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {AuthSession} ctx.auth
   */
  async show ({ params, auth }) {
    const user = await auth.getUser()

    const meetup = await Meetup.findOrFail(params.id)

    await meetup.loadMany(['user', 'file'])

    const subscription = await Subscription.findBy({
      meetup_id: params.id,
      user_id: user.id
    })

    const subscriptions_count = await Subscription.query()
      .where({ meetup_id: params.id })
      .getCount()

    meetup.is_subscribed = !!subscription
    meetup.subscriptions_count = subscriptions_count

    return meetup
  }
}

module.exports = DefaultController
