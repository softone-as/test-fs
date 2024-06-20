import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { ITag } from 'interface-models/movie/tag.interface';
import { TagRepository } from '../repositories/tag.repository';
import { TagCreateRequest } from '../requests/tag/tag-create.request';
import { TagEditRequest } from '../requests/tag/tag-edit.request';
import { TagIndexRequest } from '../requests/tag/tag-index.request';
import { In } from 'typeorm';
import { MovieRepository } from '../repositories/movie.repository';

@Injectable()
export class TagService {
    constructor(
        private readonly tagRepository: TagRepository,
        private readonly movieRepository: MovieRepository,
    ) {}

    async pagination(
        request: TagIndexRequest,
    ): Promise<IPaginateResponse<ITag>> {
        return this.tagRepository.pagination(request);
    }

    async findAll(): Promise<ITag[]> {
        return await this.tagRepository.find({
            relations: ['movies'],
        });
    }

    async findOneById(id: number): Promise<ITag> {
        return await this.tagRepository.findOneOrFail({
            where: { id },
            relations: ['movies'],
        });
    }

    async findByIds(ids: number[]): Promise<ITag[]> {
        return await this.tagRepository.find({
            where: {
                id: In(ids),
            },
            relations: ['movies'],
        });
    }

    async create(data: TagCreateRequest): Promise<void> {
        const tagExists = await this.tagRepository.isTagExists(data.name);

        if (tagExists) {
            throw new UnprocessableEntityException(
                `Tag ${data.name} has already exists`,
            );
        }

        this.tagRepository.create(data);
        await this.tagRepository.save(data);
    }

    async delete(tagId: number): Promise<void> {
        const tag = await this.tagRepository.findOneWithRelations(tagId);

        if (!tag) {
            throw new NotFoundException(`Tag with ID ${tagId} not found`);
        }

        // Remove references in the pivot table
        for (const movie of tag.movies) {
            movie.tags = movie.tags.filter((t) => t.id !== tagId);
            await this.movieRepository.save(movie);
        }

        // Now delete the tag
        await this.tagRepository.remove(tag);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.tagRepository.bulkDelete(ids);
    }

    async update(id: number, request: TagEditRequest): Promise<void> {
        const tag = await this.tagRepository.findOne({
            where: { id },
            relations: ['movies'],
        });

        if (!tag) {
            throw new UnprocessableEntityException(
                `Tag ${request.name} not found`,
            );
        }

        const tagExists = await this.tagRepository.isTagExists(request.name);

        if (tagExists) {
            throw new UnprocessableEntityException(
                `Tag ${request.name} has already exists`,
            );
        }

        tag.name = request.name;
        await this.tagRepository.save(tag);
    }
}
