import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const isAuthenticate = context
            .switchToHttp()
            .getRequest()
            .isAuthenticated();

        if (!isAuthenticate) {
            throw new UnauthorizedException('Login first');
        }

        return true;
    }
}
