import {
    OnQueueActive,
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MovieService } from '../services/movie.service';
import { UpdatePlayUntilRequest } from '../requests/movie/movie-edit.request';
import {
    QUEUE_MOVIE,
    QUEUE_MOVIE_BULK_UPDATE_PLAY_UNTIL,
} from './movie-queue.constants';

@Processor(QUEUE_MOVIE)
export class MovieConsumer {
    constructor(private readonly movieService: MovieService) {}

    private readonly logger = new Logger(MovieService.name);

    @OnQueueActive()
    onActive(job: Job): void {
        this.logger.debug(
            `Job ${job.name} is started with id: ${job.id} and data: ${job.data.id}`,
        );
    }

    @Process(QUEUE_MOVIE_BULK_UPDATE_PLAY_UNTIL)
    async process(job: Job<UpdatePlayUntilRequest>): Promise<void> {
        this.logger.debug(
            `Processing job ${job.name} with id: ${job.id} and data: ${job.data.id}`,
        );

        await this.movieService.processBulkUpdatePlayUntil({
            ...job.data,
        });
    }

    @OnQueueFailed()
    onFailed(job: Job): void {
        this.logger.error(
            `Failed job ${job.name} with id: ${job.id} and data: ${job.data.id}`,
        );
        this.logger.error(job.failedReason);
    }

    @OnQueueCompleted()
    onCompleted(job: Job): void {
        this.logger.log(
            `Job ${job.name} with id: ${job.id} and data: ${job.data.id} completed`,
        );
    }
}
