import axios, { AxiosInstance } from 'axios';
import { TODO } from '@todo-list/model';

interface IConfiguration {
  baseURL: string;
}

export class TODOApi {
  private request:AxiosInstance;

  constructor(protected config: IConfiguration) {
    const { baseURL } = config;
    this.request = axios.create({
      baseURL
    });
    
  }

  /**
   * 
   * @returns 
   */
   async list(): Promise<TODO.Response.TList> {
    try {
      const result = await this.request.get('/todo');
      if(result.status !== 200) {
        return {
          state: false,
          error: {
            message: 'An error occurred listing tasks'
          }
        }
      }

      return {
        state: true,
        data: result.data as TODO.TTODOList
      };
    } catch (ex) {
      console.error('An error ocurred trying to get TODO list');
      throw ex;
    }
  }

  async add(todo: TODO.Message.TCreate): Promise<TODO.Response.TCreate> {
    try {
      const result = await this.request.post('/todo', todo);
      if(result.status !== 201) {
        return {
          state: false,
          error: {
            message: 'An error occurred creating tasks'
          }
        }
      }

      return {
        state: true,
        data: result.data as TODO.TTODO
      };
    } catch (ex) {
      console.error('An error ocurred trying to create task');
      throw ex;
    }
  }

  async toggleDone(id: string, status: boolean): Promise<TODO.Response.TCreate> {
    try {
      const action = status ? 'mark' : 'unmark'
      const result = await this.request.put(`/todo/${id}/${action}`);
      if(result.status !== 200) {
        return {
          state: false,
          error: {
            message: 'An error occurred while completing the tasks.'
          }
        }
      }
      return {
        state: true,
        data: result.data as TODO.TTODO
      };
    } catch (ex) {
      console.error('An error ocurred trying to complete task');
      throw ex;
    }
  }

  async delete(id: string): Promise<TODO.Response.TVoid> {
    try {
      const result = await this.request.delete(`/todo/${id}`);
      if(result.status !== 200) {
        return {
          state: false,
          error: {
            message: 'An error occurred while removing the tasks.'
          }
        }
      }

      return {
        state: true,
      };
    } catch (ex) {
      console.error('An error ocurred trying to remove task');
      throw ex;
    }
  }

  async removeAll(ids: string[]): Promise<TODO.Response.TVoid> {
    try {
      const result = await this.request.post(`/todo/deleteAll`, { ids });
      if(result.status !== 201) {
        return {
          state: false,
          error: {
            message: 'An error occurred while removing the tasks.'
          }
        }
      }

      return {
        state: true,
      };
    } catch (ex) {
      console.error('An error ocurred trying to remove task');
      throw ex;
    }
  }
}

export default new TODOApi({
  baseURL: 'http://localhost:8080'
})