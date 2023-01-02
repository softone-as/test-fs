import { Injectable } from '@nestjs/common';

import { CheckLocationRequest } from '../requests/region.request';
import axios from 'axios';
import { RegionService } from '../services/region.service';

@Injectable()
export class RegionApplication {
    constructor(private readonly regionService: RegionService) {}

    async isCoverageLocation(request: CheckLocationRequest): Promise<boolean> {
        // Disabling feature
        return true;

        /**
         * Cache strategi for lat/long
         * Using fixed 2 (0,00) for caching, because too granular
         */

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${request.latitude},${request.longitude}&key=${process.env.GOOGLE_MAPS_API}`;
        const res = await axios.get(url);
        const resData = res.data;
        if (resData.error_message) {
            throw new Error('Third Party API Err');
        }
        const cityObj = resData.results[0].address_components.find(
            (addressComponent: { types: string[] }) =>
                addressComponent.types[0] == 'administrative_area_level_2',
        );

        // Outside Indonesia
        if (!cityObj) {
            return false;
        }

        const cityName = cityObj.long_name.toUpperCase();

        const findAvail = await this.regionService.findOneByCityName(cityName);

        const isLocationValid =
            findAvail == undefined ? 'notCovered' : 'covered';

        return isLocationValid == 'covered' ? true : false;
    }
}
