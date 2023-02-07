import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SentryQueryService } from './sentry-query.service';

@Injectable()
export class SentryQueryMiddleware implements NestMiddleware {
    constructor(private sentryQueryService: SentryQueryService) {}

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        const transaction = this.sentryQueryService.startTransaction(req);
        const nextCall = next();
        this.sentryQueryService.finishTransaction(transaction);
        return nextCall;
    }
}
