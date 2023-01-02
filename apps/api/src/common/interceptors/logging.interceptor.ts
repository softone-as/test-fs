import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { HttpService } from 'nestjs-http-promise';
import { AxiosResponse } from 'axios';
import { config } from '../../config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private httpService: HttpService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        let user: string = null;
        let role: string = null;

        if (req.originalUrl.includes('/health')) {
            return next.handle();
        }

        if (req.user) {
            user = req.user['fullname'];
            role = req.user['role']?.name || 'not set';
        }

        const prepareLog =
            user + ' ' + role + ' | ' + req.method + ' ' + req.originalUrl + ' ' + req.body;

        this.httpService
            .post<AxiosResponse<any>>(
                config.logging.host + '/create-log',
                {
                    log: prepareLog,
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                { headers: { 'Content-Type': 'application/json' } },
            )
            .catch((e) => {
                console.log('[Logging Error] - ' + e.message);
            });

        return next.handle();
    }
}
