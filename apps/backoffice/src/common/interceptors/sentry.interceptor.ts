import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SentryService } from '../../infrastructure/sentry/sentry.service';

/**
 * We must be in Request scope as we inject SentryService
 */
@Injectable({ scope: Scope.REQUEST })
export class SentryInterceptor implements NestInterceptor {
    constructor(private sentryService: SentryService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // start a child span for performance tracing
        const span = this.sentryService.startChild({
            op: `route handler`,
            status: 'ok',
        });

        return next.handle().pipe(
            finalize(() => {
                span.finish();
                this.sentryService.span.finish();
            }),
        );
    }
}
