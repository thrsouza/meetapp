'use strict'

const BaseModel = require('./Base/BaseModel')
const Env = use('Env')

class File extends BaseModel {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
