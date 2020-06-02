import { resolve } from 'path';
/**
 * command to run migrations
 * npx knex migrate:latest --knexfile knexfile.ts migrate:latest
 */
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true,
};