import { Injectable, NestMiddleware } from '@nestjs/common';
import { config } from 'apps/graphql/src/config';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheCleanMiddleware implements NestMiddleware {
    constructor(private readonly cacheService: CacheService) { }

    use(req: Request, res: Response, next: NextFunction): any {
        if (req.query['cache']) {
            const caches = config.cache.name;
            const cacheKeys = Object.keys(caches);

            if (req.query['cache'] == 'clean-all') {
                this.cleanCacheDetail(cacheKeys);
                this.cleanCacheList(cacheKeys);
            } else if (req.query['cache'] == 'clean-list') {
                this.cleanCacheList(cacheKeys);
            } else if (req.query['cache'] == 'clean-detail') {
                this.cleanCacheDetail(cacheKeys);
            } else {
                const nameCache = <string>req.query['cache'];
                nameCache.replace('clean-', '');
                this.cacheService.cleanCacheMatch(nameCache);
            }
        }

        next();
    }

    cleanCacheDetail(cacheKeys: string[]): void {
        const caches = config.cache.name;
        cacheKeys.forEach((key) => {
            const detailKey = caches[key].detail;
            this.cacheService.cleanCacheMatch(detailKey);
        });
    }

    cleanCacheList(cacheKeys: string[]): void {
        const caches = config.cache.name;
        cacheKeys.forEach((key) => {
            const detailKey = caches[key].list;
            this.cacheService.cleanCacheMatch(detailKey);
        });
    }
}
