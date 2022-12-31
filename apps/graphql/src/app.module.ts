import {
    HttpException,
    Module,
    ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { QueryFailedError } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IAMModule } from './modules/iam/iam.module';
import { join } from 'lodash';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOption } from 'apps/graphql/src/infrastructure/databases';
import { CacheModule } from './infrastructure/cache/cache.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionOption),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'apps/graphql/assets/schema.gql',
        }),
        CacheModule,
        RavenModule,
        IAMModule,
    ],
    providers: [
        {
            // Validation formatting response
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            // Sentry configuration
            provide: APP_INTERCEPTOR,
            useValue: new RavenInterceptor({
                filters: [
                    {
                        type: HttpException,
                        filter: (exception: HttpException) =>
                            500 > exception.getStatus(),
                    },
                    {
                        type: QueryFailedError,
                        filter: () => false,
                    },
                ],
            }),
        },
    ],
})
export class AppModule { }