import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { TODO } from '@todo-list/model'

import TodoService from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) { }

  @Get()
  async list():Promise<TODO.TTODO[]> {
    return await this.service.list();
  }

  @Post()
  async create(@Body() todo: TODO.Message.TCreate) {
    return await this.service.create(todo)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id)
  }

  @Put(':id/mark')
  async mark(@Param('id') id: string) {
    return await this.service.mark(id, true)
  }

  @Put(':id/unmark')
  async unmark(@Param('id') id: string) {
    return await this.service.mark(id, false)
  }

  @Post('deleteAll')
  async deleteAll(@Body() body: TODO.Message.TRemove) {
    return await this.service.remove(body)
  }
}

export default TodoController;
