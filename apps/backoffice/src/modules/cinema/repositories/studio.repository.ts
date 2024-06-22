import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Repository } from 'typeorm';

import { Studio } from 'entities/movie/studio.entity';
import { StudioIndexRequest } from '../requests/studio/studio-index.request';
import { IStudio } from 'interface-models/movie/studio.interface';

@Injectable()
export class StudioRepository extends Repository<Studio> {
    constructor(
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            studioRepository.target,
            studioRepository.manager,
            studioRepository.queryRunner,
        );
    }

    async pagination(
        request: StudioIndexRequest,
    ): Promise<IPaginateResponse<IStudio>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.studioRepository
            .createQueryBuilder('studio')
            .leftJoinAndSelect('studio.movieSchedules', 'movieSchedules');

        if (request.search) {
            query.andWhere(`studio.studioNumber like :search`, {
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
                    ? `studio.${request.sort}`
                    : `studio.createdAt`,
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

    async isStudioExists(studioNumber: number): Promise<boolean> {
        const studio = await this.studioRepository.findOne({
            where: { studioNumber },
        });

        return !!studio;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.studioRepository.delete(ids);
    }

    async findOneWithRelations(id: number): Promise<Studio | null> {
        return await this.studioRepository
            .createQueryBuilder('studio')
            .leftJoinAndSelect('studio.movieSchedules', 'movieSchedules')
            .where('studio.id = :id', { id })
            .getOne();
    }
}
