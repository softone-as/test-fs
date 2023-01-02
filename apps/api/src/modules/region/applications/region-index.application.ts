import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/api/src/common/interface/index.interface';
import { IndexApplication } from 'apps/api/src/infrastructure/applications/index.application';

import { City } from 'entities/region/city.entity';
import { District } from 'entities/region/district.entity';
import { Repository } from 'typeorm';
import {
    CityIndexRequest,
    DistrictIndexRequest,
} from '../requests/region-index.request';

@Injectable()
export class RegionIndexApplication extends IndexApplication {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,
    ) {
        super();
    }

    // Get All City
    async fetch(request: CityIndexRequest): Promise<IPaginateResponse<City>> {
        const query = this.cityRepository.createQueryBuilder('city');

        if (request.search) {
            query.where(`concat(city.name) like :search`, {
                search: `%${request.search}%`,
            });
        }

        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));
        const [data, count] = await query.getManyAndCount();
        const meta = this.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    // Get All District
    async fetchDistrict(
        request: DistrictIndexRequest,
    ): Promise<IPaginateResponse<District>> {
        const query = this.districtRepository.createQueryBuilder('district');
        query.where(`district.cityId = :cityId`, {
            cityId: request.cityId,
        });

        if (request.search) {
            query.where(`concat(district.name) like :search`, {
                search: `%${request.search}%`,
            });
        }

        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));
        const [data, count] = await query.getManyAndCount();
        const meta = this.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }
}
