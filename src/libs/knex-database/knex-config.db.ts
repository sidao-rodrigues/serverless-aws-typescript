import { IKnexConfig } from '@interfaces/database/knex.interface';
import { handlerPath } from '@libs/infra/handler-resolver.lib';
import { prod as prodEnv, qas as qasEnv } from '@resources/env.resource';
import { Knex } from 'knex';
import * as path from 'path';

const handlerPathResolve: string = handlerPath(__dirname);

const dev: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(handlerPathResolve, '..', '..', '..', 'dev-db.sqlite'),
  },
  migrations: {
    directory: path.resolve(handlerPathResolve, 'migrations'),
  },
  seeds: {
    directory: path.resolve(handlerPathResolve, 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: (...args: any[]) => void) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    },
  },
};

const qas: Knex.Config = {
  client: process.env.DB_CLIENT || qasEnv.DB_CLIENT,
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST || qasEnv.DB_HOST,
    port: +process.env.DB_PORT || qasEnv.DB_PORT,
    user: process.env.DB_USER || qasEnv.DB_USER,
    password: process.env.DB_PASSWORD || qasEnv.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME || qasEnv.DB_DATABASE_NAME,
    requestTimeout: 29.5 * 1000,
    statement_timeout: 20 * 1000,
    ssl: true,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(handlerPathResolve, 'migrations'),
  },
};

const prod: Knex.Config = {
  client: process.env.DB_CLIENT || prodEnv.DB_CLIENT,
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST || prodEnv.DB_HOST,
    port: +process.env.DB_PORT || prodEnv.DB_PORT,
    user: process.env.DB_USER || prodEnv.DB_USER,
    password: process.env.DB_PASSWORD || prodEnv.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME || prodEnv.DB_DATABASE_NAME,
    requestTimeout: 29.5 * 1000,
    statement_timeout: 20 * 1000,
    ssl: true,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(handlerPathResolve, 'migrations'),
  },
};

export default {
  dev,
  qas,
  prod,
} as IKnexConfig;
