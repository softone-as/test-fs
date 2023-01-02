import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    UnauthorizedException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';


@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
        throw new NotFoundException();
    }
}
