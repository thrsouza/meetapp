'use strict'

const GenericHook = (exports = module.exports = {})

/**
 * A hook to provide an UUID (Universal Unique ID)
 */
GenericHook.createUUID = async modelInstance => {
  modelInstance.id = require('uuid').v4()
}
