import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IStudio } from 'interface-models/movie/studio.interface';
import { In } from 'typeorm';
import { StudioRepository } from '../repositories/studio.repository';
import { StudioCreateRequest } from '../requests/studio/studio-create.request';
import { StudioEditRequest } from '../requests/studio/studio-edit.request';
import { StudioIndexRequest } from '../requests/studio/studio-index.request';

@Injectable()
export class StudioService {
    constructor(private readonly studioRepository: StudioRepository) {}

    async pagination(
        request: StudioIndexRequest,
    ): Promise<IPaginateResponse<IStudio>> {
        return this.studioRepository.pagination(request);
    }

    async findAll(): Promise<IStudio[]> {
        return await this.studioRepository.find({
            relations: ['movieSchedules'],
        });
    }

    async findOneById(id: number): Promise<IStudio> {
        return await this.studioRepository.findOneOrFail({
            where: { id },
            relations: ['movieSchedules'],
        });
    }

    async findByIds(ids: number[]): Promise<IStudio[]> {
        return await this.studioRepository.find({
            where: {
                id: In(ids),
            },
            relations: ['movieSchedules'],
        });
    }

    async create(data: StudioCreateRequest): Promise<void> {
        const studioExists = await this.studioRepository.isStudioExists(
            data.studioNumber,
        );

        if (studioExists) {
            throw new UnprocessableEntityException(
                `Studio ${data.studioNumber} has already exists`,
            );
        }

        this.studioRepository.create(data);
        await this.studioRepository.save(data);
    }

    async delete(studioId: number): Promise<void> {
        const studio = await this.studioRepository.findOneWithRelations(
            studioId,
        );

        if (!studio) {
            throw new NotFoundException(`Studio with ID ${studioId} not found`);
        }

        // Now delete the studio
        await this.studioRepository.remove(studio);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.studioRepository.bulkDelete(ids);
    }

    async update(id: number, request: StudioEditRequest): Promise<void> {
        const studio = await this.studioRepository.findOne({
            where: { id },
            relations: ['movieSchedules'],
        });

        if (!studio) {
            throw new UnprocessableEntityException(
                `Studio ${request.studioNumber} not found`,
            );
        }

        const studioExists = await this.studioRepository.isStudioExists(
            request.studioNumber,
        );

        if (studioExists) {
            throw new UnprocessableEntityException(
                `Studio ${request.studioNumber} has already exists`,
            );
        }

        studio.studioNumber = request.studioNumber;
        await this.studioRepository.save(studio);
    }
}
