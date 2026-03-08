import * as KNEX from './src/db/knexConfig'
import { Knex } from 'knex'

const config: Knex.Config = {
  client: KNEX.CLIENT,
  connection: {
    host: KNEX.HOST,
    port: KNEX.PORT_NUMBER,
    user: KNEX.USER_NAME,
    password: KNEX.PASSWORD,
    database: KNEX.DATABASE_NAME,
  },
  migrations: {
    directory: KNEX.DIRECTORY,
    extension: KNEX.EXTENSION,
  },
}

export default config