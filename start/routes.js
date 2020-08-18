'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('users', 'UserController.store').validator('User')

Route.post('login', 'SessionController.store')
Route.get('me', 'SessionController.whoami')
Route.post('passwords', 'ForgotPasswordController.store')

Route.group(() => {
  Route.resource('events', 'EventController').apiOnly()
  Route.resource('condominiums', 'CondominiumController')
    .apiOnly()
    .except('index')
}).middleware(['auth'])
Route.get('condominiums', 'CondominiumController.index')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
