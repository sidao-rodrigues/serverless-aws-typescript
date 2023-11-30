import { Knex, knex } from 'knex';

import knexEnvs from './knex-config.db';

const getEnv = (): Knex.Config => knexEnvs[process.env.ENV_STAGE || 'dev'];

export const knexConnection = knex(getEnv());
