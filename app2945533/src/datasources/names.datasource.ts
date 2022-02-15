import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'names',
  connector: 'mysql',
  url: '',
  host: 'sql11.freemysqlhosting.net',
  port: 3306,
  user: 'sql11472982',
  password: '825PWpdWGq',
  database: 'sql11472982'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NamesDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'names';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.names', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
