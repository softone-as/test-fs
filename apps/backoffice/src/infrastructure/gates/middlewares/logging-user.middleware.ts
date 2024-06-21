import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { ip } = req;

        res.on('finish', () => {
            Logger.log(`App hitted by ip address: ${ip}`);
        });

        next();
    }
}
