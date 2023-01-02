import { Expose } from 'class-transformer';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { UserResponse } from './user.response';
// import { UserResponse } from '../../deposit-trash/responses/deposit-pickup-detail.response';

export class DistrictResponse {
    id: number;
    name: string;
    city: CityResponse;
}

export class CityResponse {
    id: number;
    name: string;
}

export class UserAddressResponse {
    id: number;

    mark: string;

    address: string;

    latitude: string;

    longitude: string;

    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @Expose({ name: 'is_primary' })
    isPrimary: boolean;

    user?: UserResponse;

    district?: DistrictResponse;

    static fromEntity(data: IUserAddress): UserAddressResponse {
        const userAddressResponse = <UserAddressResponse>{};

        userAddressResponse.mark = data.mark;
        userAddressResponse.address = data.address;
        userAddressResponse.phoneNumber = data.phoneNumber;
        userAddressResponse.latitude = data.latitude;
        userAddressResponse.longitude = data.longitude;
        userAddressResponse.isPrimary = data.isPrimary;

        return userAddressResponse;
    }

    static fromEntityWithRelation(data: IUserAddress): UserAddressResponse {
        const userAddressResponse = <UserAddressResponse>{};

        userAddressResponse.id = data.id;
        userAddressResponse.mark = data.mark;
        userAddressResponse.address = data.address;
        userAddressResponse.phoneNumber = data.phoneNumber;
        userAddressResponse.latitude = data.latitude;
        userAddressResponse.longitude = data.longitude;
        userAddressResponse.isPrimary = data.isPrimary;
        userAddressResponse.user = <UserResponse>{
            id: data.user.id,
            name: data.user.fullname,
        };
        userAddressResponse.district = <DistrictResponse>{
            id: data.district.id,
            name: data.district.name,
            city: {
                id: data.district.city.id,
                name: data.district.city.name,
            },
        };

        return userAddressResponse;
    }
}
