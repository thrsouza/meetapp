# Meetapp - Back-end

This project was created to Rocketseat final challenge.

<br/>

## Install dependencies

```shell
$ yarn || npm install
```

<br/>

## Migrations

Run the following command to run startup migrations and seeders.

```shell
$ yarn db:configure || npm run db:configure
```

<br/>

## Run Application

Configure the `.env` file based into `.env.example` and run:

```shell
# TERMINAL 01
$ yarn start:dev || npm run start:dev
```

```shell
# TERMINAL 02
$ adonis kue:listen
```

<br/>

## Route List

| Route                      | Verb(s)   | Handler                               | Middleware                         |
| -------------------------- | --------- | ------------------------------------- | ---------------------------------- |
| /sessions                  | POST      | SessionController.store               | av:Session/Store                   |
| /users                     | POST      | UserController.store                  | av:User/Store                      |
| /users/:id                 | HEAD,GET  | UserController.show                   | auth                               |
| /users/:id                 | PUT,PATCH | UserController.update                 | auth, av:User/Update               |
| /meetups/themes            | HEAD,GET  | Meetup/ThemeController.index          | auth                               |
| /meetups/recommended       | HEAD,GET  | Meetup/RecommendedController.index    | auth                               |
| /meetups/upcoming          | HEAD,GET  | Meetup/UpcomingController.index       | auth                               |
| /meetups/subscriptions     | HEAD,GET  | Meetup/SubscriptionController.index   | auth                               |
| /meetups/subscriptions     | POST      | Meetup/SubscriptionController.store   | auth, av:Meetup/Subscription/Store |
| /meetups/subscriptions/:id | DELETE    | Meetup/SubscriptionController.destroy | auth                               |
| /meetups                   | HEAD,GET  | Meetup/DefaultController.index        | auth                               |
| /meetups                   | POST      | Meetup/DefaultController.store        | auth, av:Meetup/Default/Store      |
| /meetups/:id               | HEAD,GET  | Meetup/DefaultController.show         | auth                               |
| /files                     | POST      | FileController.store                  | auth                               |
| /files/:id                 | HEAD,GET  | FileController.show                   |                                    |

<br />

Best regards,

**Thiago Rodrigues de Souza** \
**e-mail:** email@thiagodesouza.com.br \
**site:** [https://www.thiagodesouza.com.br](https://www.thiagodesouza.com.br)
