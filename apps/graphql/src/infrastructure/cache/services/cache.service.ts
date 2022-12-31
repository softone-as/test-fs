import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IndexRequest } from 'apps/graphql/src/common/request/index.request';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async getNameCacheIndex(
        key: string,
        indexRequest: IndexRequest,
    ): Promise<string> {
        return (
            key +
            '-' +
            indexRequest.page +
            '-' +
            indexRequest.perPage +
            '-' +
            indexRequest.order +
            '-' +
            indexRequest.sort +
            '-' +
            indexRequest.search
        );
    }

    async getNameCacheList(key: string, params: string[]): Promise<string> {
        return key + '-' + params.join('-');
    }

    async getNameCacheDetailNumber(key: string, id: number): Promise<string> {
        return key + '-' + id;
    }

    async getNameCacheDetailString(key: string, id: string): Promise<string> {
        return key + '-' + id;
    }

    async setCache<T>(key: string, data: T): Promise<void> {
        await this.cacheManager.set<T>(key, data);
    }

    async getCache<T>(key: string): Promise<T> {
        return (await this.cacheManager.get<T>(key)) || null;
    }

    async deleteCache(key: string): Promise<any> {
        await this.cacheManager.del(key);
    }

    async resetCache(): Promise<void> {
        await this.cacheManager.reset();
    }

    async cleanCacheMatch(keyMatch: string): Promise<void> {
        const cacheNames = await this.cacheManager.store.keys<string[]>();
        const names = cacheNames.filter((name) => {
            return name.includes(keyMatch);
        });

        names.forEach((cacheName) => {
            this.deleteCache(cacheName)
                .then(() => console.log('clean : ' + cacheName))
                .catch(() => console.log('error clean : ' + cacheName));
        });
    }

    async cleanCacheMatches(keyMatches: string[]): Promise<void> {
        keyMatches.forEach((keyMatch) => this.cleanCacheMatch(keyMatch));
    }
}
