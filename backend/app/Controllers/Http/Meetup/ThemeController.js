'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Theme = use('App/Models/Theme')

/**
 * Resourceful controller for interacting with themes
 */
class ThemeController {
  /**
   * Show a list of all themes.
   * GET meetups/themes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page, limit } = request.get()

    const themes = await Theme.query().paginate(page, limit)

    return themes
  }
}

module.exports = ThemeController
