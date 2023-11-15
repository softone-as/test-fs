import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import AccessLoginAuthenticatedException from '../../infrastructure/error/access-login-authenticated.exception';
import BadRequestAndRedirectException from '../../infrastructure/error/bad-request-and-redirect.exception';
import { Utils } from '../utils/util';
import { captureException } from '../../infrastructure/sentry/sentry-capture-exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const path = request.path.slice(1);

        let traceIdFromFe = "";
        let replayIdFromFe = "";

        if (request.headers['baggage']) {
            const baggageHeader = request.headers['baggage'].toString();
            
            [
                traceIdFromFe, 
                replayIdFromFe
            ] = Utils.splitBaggageHeader(baggageHeader);
        }

        // Capture exception to Sentry
        captureException(exception, request, traceIdFromFe, replayIdFromFe);

        if (exception instanceof UnprocessableEntityException) {
            const exceptionResponse = exception.getResponse();
            const data = exceptionResponse['data'] || null;

            request.session['error'] = {
                errors: data,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            if (path == 'auth/confirm-forgot-password') {
                const redirectedPathChangePassword =
                    request.originalUrl.replace(path, 'auth/change-password');
                return response.redirect(
                    Utils.pathToUrl(redirectedPathChangePassword),
                );
            }

            return response.redirect(Utils.pathToUrl(path));
        } else if (exception instanceof UnauthorizedException) {
            return response.redirect(Utils.pathToUrl('/auth/login'));
        } else if (exception instanceof ForbiddenException) {
            request.session['error'] = {
                errors: null,
                message: 'Forbidden Access',
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl('/forbidden-error'));
        } else if (exception instanceof InternalServerErrorException) {
            request.session['error'] = {
                errors: null,
                message: 'Internal Server Error',
                statusCode: exception.getStatus(),
            };
            return response.redirect(Utils.pathToUrl('/server-error'));
        } else if (exception instanceof BadRequestAndRedirectException) {
            request.session['error'] = {
                errors: null,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl(exception.path));
        } else if (exception instanceof AccessLoginAuthenticatedException) {
            return response.redirect(Utils.pathToUrl('/dashboard/page'));
        } else if (exception instanceof BadRequestException) {
            request.session['error'] = {
                errors: null,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl(path));
        } else if (exception instanceof NotFoundException) {
            request.session['error'] = {
                errors: null,
                message: 'Internal Server Error',
                statusCode: exception.getStatus(),
            };
            return response.redirect(Utils.pathToUrl('/not-found-error'));
        }
    }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = 404;

        const path = request.path.slice(1);

        request.session['error'] = {
            errors: null,
            message: 'Data not found',
            statusCode: status,
        };
        return response.redirect(Utils.pathToUrl(path));
    }
}
