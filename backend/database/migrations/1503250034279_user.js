'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table
        .uuid('id')
        .notNullable()
        .primary()
      table.string('name', 64).notNullable()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table.string('password', 128).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
