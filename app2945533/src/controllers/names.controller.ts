import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Names} from '../models';
import {NamesRepository} from '../repositories';

export class NamesController {
  constructor(
    @repository(NamesRepository)
    public namesRepository : NamesRepository,
  ) {}

  @post('/names')
  @response(200, {
    description: 'Names model instance',
    content: {'application/json': {schema: getModelSchemaRef(Names)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Names, {
            title: 'NewNames',
            exclude: ['id'],
          }),
        },
      },
    })
    names: Omit<Names, 'id'>,
  ): Promise<Names> {
    return this.namesRepository.create(names);
  }

  @get('/names/count')
  @response(200, {
    description: 'Names model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Names) where?: Where<Names>,
  ): Promise<Count> {
    return this.namesRepository.count(where);
  }

  @get('/names')
  @response(200, {
    description: 'Array of Names model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Names, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Names) filter?: Filter<Names>,
  ): Promise<Names[]> {
    return this.namesRepository.find(filter);
  }

  @patch('/names')
  @response(200, {
    description: 'Names PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Names, {partial: true}),
        },
      },
    })
    names: Names,
    @param.where(Names) where?: Where<Names>,
  ): Promise<Count> {
    return this.namesRepository.updateAll(names, where);
  }

  @get('/names/{id}')
  @response(200, {
    description: 'Names model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Names, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Names, {exclude: 'where'}) filter?: FilterExcludingWhere<Names>
  ): Promise<Names> {
    return this.namesRepository.findById(id, filter);
  }

  @patch('/names/{id}')
  @response(204, {
    description: 'Names PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Names, {partial: true}),
        },
      },
    })
    names: Names,
  ): Promise<void> {
    await this.namesRepository.updateById(id, names);
  }

  @put('/names/{id}')
  @response(204, {
    description: 'Names PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() names: Names,
  ): Promise<void> {
    await this.namesRepository.replaceById(id, names);
  }

  @del('/names/{id}')
  @response(204, {
    description: 'Names DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.namesRepository.deleteById(id);
  }
}
