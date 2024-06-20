import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginateUtil } from '../../common/utils/paginate.util';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { MovieController } from './controllers/movie.controller';
import { Movie } from 'entities/movie/movie.entity';
import { MovieService } from './services/movie.service';
import { MovieRepository } from './repositories/movie.repository';
import { Tag } from 'entities/movie/tag.entity';
import { TagController } from './controllers/tag.controller';
import { TagService } from './services/tag.service';
import { TagRepository } from './repositories/tag.repository';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { MovieConsumer } from './queues/movie-processor.queue';
import { QUEUE_MOVIE } from './queues/movie-queue.constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie, Tag]),
        HttpModule,
        BullModule.registerQueue({
            name: QUEUE_MOVIE,
        }),
    ],
    controllers: [MovieController, TagController],
    providers: [
        InertiaAdapter,
        PaginateUtil,

        MovieService,
        MovieRepository,
        MovieConsumer,

        TagService,
        TagRepository,
    ],
    exports: [TypeOrmModule, PaginateUtil],
})
export class MovieModule {}
