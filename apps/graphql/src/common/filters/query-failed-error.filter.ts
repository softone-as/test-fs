import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost): void {
        throw new InternalServerErrorException();
    }
}
