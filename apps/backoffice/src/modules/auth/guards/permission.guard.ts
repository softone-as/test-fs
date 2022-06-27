import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    mixin,
    UnauthorizedException,
} from '@nestjs/common';
import { Type } from '@nestjs/passport';
import { LoggedInGuard } from './logged-in.guard';

export const PermissionGuard = (permissionKey: string): Type<CanActivate> => {
    class PermissionGuardMixin implements LoggedInGuard {
        canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest().user;
            if (!user) {
                throw new UnauthorizedException('Login first');
            }

            const permissionKeys = user?.role.permissions.map(
                (permission) => permission.key,
            );

            if (!permissionKeys.includes(permissionKey)) {
                throw new ForbiddenException('Not allowed');
            }

            return true;
        }
    }
    return mixin(PermissionGuardMixin);
};
