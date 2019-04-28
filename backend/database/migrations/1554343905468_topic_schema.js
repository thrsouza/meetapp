'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', table => {
      table
        .uuid('id')
        .notNullable()
        .primary()
      table
        .uuid('meetup_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .uuid('theme_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('themes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('topics')
  }
}

module.exports = TopicSchema
