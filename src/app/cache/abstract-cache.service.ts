export abstract class AbstractCacheService {

  abstract put(key: string, value: any): void;

  abstract get(key: string): any;

  abstract remove(key: string): void;

}
