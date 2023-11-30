import { Knex } from 'knex';

interface IKnexConfig {
  [key: string]: Knex.Config;
  dev: Knex.Config;
  qas: Knex.Config;
  prod: Knex.Config;
}

export { IKnexConfig };
