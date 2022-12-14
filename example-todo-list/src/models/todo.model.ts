// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  // TODO(bajtos) Use LoopBack's GeoPoint type here
  @property({
    type: 'string',
  })
  remindAtGeo?: string;

  @belongsTo(() => TodoList)
  todoListId: number;

  @property({
    type: 'any',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tag?: any;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
    todoList?: TodoListWithRelations;
}
  
export type TodoWithRelations = Todo & TodoRelations;


