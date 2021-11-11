import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractCacheService} from './abstract-cache.service';
import {InMemoryCacheService} from './in-memory-cache.service';
import {CacheViewerComponent} from './cache-viewer/cache-viewer.component';
import {SessionStorageCacheService} from './session-storage-cache.service';

export const cacheFactory = (mode: CacheMode) => {
  if (mode === 'session-storage') {
    return new SessionStorageCacheService();
  } else {
    return new InMemoryCacheService();
  }
};

export const CacheModeToken = new InjectionToken<CacheMode>('cache-mode');

export type CacheMode = 'memory' | 'session-storage';

@NgModule({
  imports: [CommonModule],
  declarations: [CacheViewerComponent],
  exports: [CacheViewerComponent]
})
export class CacheModule {
  static forRoot(cacheMode: CacheMode = 'memory'): ModuleWithProviders<CacheModule> {
    return {
      ngModule: CacheModule,
      providers: [
        {provide: CacheModeToken, useValue: cacheMode},
        {provide: AbstractCacheService, useFactory: cacheFactory, deps: [CacheModeToken]}
      ]
    };
  }
}
