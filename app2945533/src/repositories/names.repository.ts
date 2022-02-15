import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NamesDataSource} from '../datasources';
import {Names, NamesRelations} from '../models';

export class NamesRepository extends DefaultCrudRepository<
  Names,
  typeof Names.prototype.id,
  NamesRelations
> {
  constructor(
    @inject('datasources.names') dataSource: NamesDataSource,
  ) {
    super(Names, dataSource);
  }
}
