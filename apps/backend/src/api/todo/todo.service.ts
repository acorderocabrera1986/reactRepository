import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { TODO } from '@todo-list/model';
import { v4 as uuid } from 'uuid';
import RedisClient from '../../client/RedisClient';
import constants from '../../constants';

@Injectable()
export class TodoService {
  /**
   * 
   * @returns 
   */
  async list(): Promise<TODO.TTODO[]> {
    try {
      const all = await RedisClient.hgetall(constants.TODO_KEY);
      return Object.keys(all).map(key => ({ ...JSON.parse(all[key]), id: key }));  
    } catch (error) {
      throw new HttpException('Error listing tasks', HttpStatus.SERVICE_UNAVAILABLE);  
    }
    
  }

  /**
   * 
   * @param todo 
   * @returns 
   */
  async create(todo:TODO.Message.TCreate): Promise<TODO.TTODO> {
    try {
      const parsedData = TODO.Message.ICreate.safeParse(todo);
      if(!parsedData.success) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      const { completed, ...rest } = parsedData.data;
      const newTask = { ...rest, id: uuid(), completed: !!completed };
      await RedisClient.hset(constants.TODO_KEY, newTask.id, JSON.stringify(newTask));
      return newTask;  
    } catch (error) {
      throw new HttpException('Error listing tasks', HttpStatus.SERVICE_UNAVAILABLE);   
    }
  }

  /**
   * 
   * @param id 
   */
  async delete(id:string): Promise<void> {
    try {
      if(typeof id !== 'string') {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);  
      }
      await RedisClient.hdel(constants.TODO_KEY, id);  
    } catch (error) {
      throw new HttpException('Error listing tasks', HttpStatus.SERVICE_UNAVAILABLE);   
    }
  }

  /**
   * 
   * @param input 
   */
  async remove(input:TODO.Message.TRemove): Promise<void> {
    try {
      const parsedData = TODO.Message.IRemove.safeParse(input);
      if(!parsedData.success) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      const { ids } = parsedData.data;
      const transaction = RedisClient.multi();
      for (let index = 0; index < ids.length; index++) {
        transaction.hdel(constants.TODO_KEY, ids[index]);
      }

      await transaction.exec();  
    } catch (error) {
      throw new HttpException('Error listing tasks', HttpStatus.SERVICE_UNAVAILABLE);    
    }
  }

  /**
   * 
   * @param id 
   * @param completed 
   * @returns 
   */
  async mark(id:string, completed: boolean): Promise<TODO.TTODO> {
    try {
      if(typeof id !== 'string' || typeof completed !== 'boolean') {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);  
      }
      const task = await RedisClient.hget(constants.TODO_KEY, id);
      const newTask = { ...JSON.parse(task), completed }
      await RedisClient.hset(constants.TODO_KEY, id, JSON.stringify(newTask));
      return newTask;  
    } catch (error) {
      throw new HttpException('Error listing tasks', HttpStatus.SERVICE_UNAVAILABLE);  
    }
  }
}

export default TodoService;
