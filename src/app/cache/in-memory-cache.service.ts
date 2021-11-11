import {AbstractCacheService} from './abstract-cache.service';

export class InMemoryCacheService implements AbstractCacheService {

  constructor() {
    console.log('Initialize InMemory-Cache');
  }
  private data: { [s: string]: any; } = {};

  put(key: string, value: any) {
    this.data[key] = value;
  }

  get(key: string): any {
    return this.data[key];
  }

  remove(key: string) {
    delete this.data[key];
  }
}
