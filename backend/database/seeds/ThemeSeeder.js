'use strict'

/*
|--------------------------------------------------------------------------
| PreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Theme = use('App/Models/Theme')

class ThemeSeeder {
  async run () {
    await Theme.createMany([
      { description: 'Front-end' },
      { description: 'Back-end' },
      { description: 'Mobile' },
      { description: 'DevOps' },
      { description: 'Gestão' },
      { description: 'Marketing' }
    ])
  }
}

module.exports = ThemeSeeder
