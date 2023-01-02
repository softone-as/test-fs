import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { District } from 'entities/region/district.entity';
import { IDistrict } from 'interface-models/region/district.interface';
import { ICity } from 'interface-models/region/city.interface';
import { City } from 'entities/region/city.entity';

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) {}

    async findOneById(id: number): Promise<IDistrict> {
        let getDistrict: District | PromiseLike<IDistrict>;
        try {
            getDistrict = await this.districtRepository.findOneOrFail({
                where: { id },
                relations: ['city'],
            });
        } catch (err) {
            return;
        }

        return getDistrict;
    }

    async findOneByName(districtName: string): Promise<IDistrict> {
        let getDistrict: District | PromiseLike<IDistrict>;
        try {
            getDistrict = await this.districtRepository.findOneOrFail({
                where: { name: Like(`%${districtName}%`) },
            });
        } catch (err) {
            return;
        }

        return getDistrict;
    }

    async findOneByCityName(cityName: string): Promise<ICity> {
        let getCity: City | PromiseLike<ICity>;
        try {
            getCity = await this.cityRepository.findOneOrFail({
                where: { name: Like(`%${cityName}%`) },
            });
        } catch (err) {
            return;
        }

        return getCity;
    }
}
