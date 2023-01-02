import { ICity } from 'interface-models/region/city.interface';
import { IDistrict } from 'interface-models/region/district.interface';

export class RegionResponse {
    id: number;

    name: string;

    cityId?: number;

    public static fromCityEntities(products: ICity[]): RegionResponse[] {
        return products.map((product) => {
            return {
                id: product.id,
                name: product.name,
            };
        });
    }

    public static fromDistrictEntities(
        products: IDistrict[],
    ): RegionResponse[] {
        return products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                cityId: product.cityId,
            };
        });
    }
}
