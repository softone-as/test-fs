import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Repository } from 'typeorm';

import { Tag } from 'entities/movie/tag.entity';
import { TagIndexRequest } from '../requests/tag/tag-index.request';
import { ITag } from 'interface-models/movie/tag.interface';

@Injectable()
export class TagRepository extends Repository<Tag> {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            tagRepository.target,
            tagRepository.manager,
            tagRepository.queryRunner,
        );
    }

    async pagination(
        request: TagIndexRequest,
    ): Promise<IPaginateResponse<ITag>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.tagRepository
            .createQueryBuilder('tag')
            .leftJoinAndSelect('tag.movies', 'movie');

        if (request.search) {
            query.andWhere(`tag.name like :search`, {
                search: `%${request.search}%`,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `tag.${request.sort}`
                    : `tag.createdAt`,
                this.paginationUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginationUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginationUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async isTagExists(name: string): Promise<boolean> {
        const tag = await this.tagRepository.findOne({
            where: { name },
        });

        return !!tag;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.tagRepository.delete(ids);
    }

    async findOneWithRelations(id: number): Promise<Tag | null> {
        return await this.tagRepository
            .createQueryBuilder('tag')
            .leftJoinAndSelect('tag.movies', 'movie')
            .leftJoinAndSelect('movie.tags', 'tags')
            .where('tag.id = :id', { id })
            .getOne();
    }
}
