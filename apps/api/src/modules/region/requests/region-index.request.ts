import { IndexRequest } from 'apps/api/src/common/request/index.request';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DistrictIndexRequest extends IndexRequest {
    @IsNotEmpty()
    @IsNumber()
    @Expose({ name: 'city_id' })
    cityId: number;

    @IsString()
    @IsOptional()
    search?: string;
}

export class CityIndexRequest extends IndexRequest {
    @IsString()
    @IsOptional()
    search?: string;
}
