'use strict'

const { test, trait } = use('Test/Suite')('User Session')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('should be able to authenticate with valid credentials', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 's3cr3tp4ss'
    })
    .end()

  response.assertStatus(200)
  assert.isTrue(!!response.body.token)
})

test('should not be able to authenticate with invalid credentials', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'backend'
    })
    .end()

  response.assertStatus(401)
  assert.isFalse(!!response.body.token)
})
