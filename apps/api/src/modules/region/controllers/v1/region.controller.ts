import { Controller, Get, Query } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import {
    CityIndexRequest,
    DistrictIndexRequest,
} from '../../requests/region-index.request';
import { RegionIndexApplication } from '../../applications/region-index.application';
import { RegionResponse } from '../../response/region.response';
import { CheckLocationRequest } from '../../requests/region.request';
import { RegionApplication } from '../../applications/region.application';
import { CacheList } from 'apps/api/src/infrastructure/cache/decorators/cache-list.decorator';

@Controller('regions')
export class RegionController {
    constructor(
        private readonly regionIndexApplication: RegionIndexApplication,
        private readonly regionApplication: RegionApplication,
    ) {}

    @Get('/city')
    @CacheList()
    async index(
        @Query() indexRequest: CityIndexRequest,
    ): Promise<IApiResponse<RegionResponse[]>> {
        const { data, meta } = await this.regionIndexApplication.fetch(
            indexRequest,
        );

        return {
            data: RegionResponse.fromCityEntities(data),
            meta,
            message: 'Success Get City',
        };
    }

    @Get('/district')
    @CacheList()
    async indexDistrict(
        @Query() indexRequest: DistrictIndexRequest,
    ): Promise<IApiResponse<RegionResponse[]>> {
        const { data, meta } = await this.regionIndexApplication.fetchDistrict(
            indexRequest,
        );

        return {
            data: RegionResponse.fromDistrictEntities(data),
            meta,
            message: 'Success Get District',
        };
    }

    @Get('/covered-area')
    @CacheList()
    async coveredArea(
        @Query() checkLocationRequest: CheckLocationRequest,
    ): Promise<IApiResponse<boolean>> {
        const res = await this.regionApplication.isCoverageLocation(
            checkLocationRequest,
        );
        if (res) {
            return {
                data: res,
                message: 'Your location is covered',
            };
        }

        return {
            data: res,
            message: 'Sorry, your location is not covered!',
        };
    }
}
