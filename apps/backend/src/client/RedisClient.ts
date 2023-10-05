import { Clients } from '@todo-list/core';
// se puede buscar del environment
export default new Clients.Redis({
  host: 'localhost',
  port: 6379
}).client();