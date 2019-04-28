'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('sessions', 'SessionController')
  .only(['store'])
  .validator(new Map([[['sessions.store'], ['Session/Store']]]))

Route.resource('users', 'UserController')
  .only(['store', 'show', 'update'])
  .middleware(new Map([[['users.show', 'users.update'], ['auth']]]))
  .validator(
    new Map([
      [['users.store'], ['User/Store']],
      [['users.update'], ['User/Update']]
    ])
  )

Route.group(() => {
  Route.resource('themes', 'ThemeController').only(['index'])
  Route.resource('recommended', 'RecommendedController').only(['index'])
  Route.resource('upcoming', 'UpcomingController').only(['index'])
  Route.resource('subscriptions', 'SubscriptionController')
    .only(['index', 'store', 'destroy'])
    .validator(
      new Map([[['subscriptions.store'], ['Meetup/Subscription/Store']]])
    )
})
  .middleware(['auth'])
  .namespace('Meetup')
  .prefix('meetups')

Route.resource('meetups', 'Meetup/DefaultController')
  .only(['store', 'index', 'show'])
  .validator(new Map([[['meetups.store'], ['Meetup/Default/Store']]]))
  .middleware(['auth'])

Route.resource('files', 'FileController')
  .only(['store', 'show'])
  .middleware(new Map([[['files.store'], ['auth']]]))
