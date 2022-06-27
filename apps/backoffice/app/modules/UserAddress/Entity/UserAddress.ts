import { DistrictType } from '../../District/Entity/District';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type UserAddressType = {
    id: string;
    mark: string;
    address: string;
    longitude: string;
    latitude: string;
    phoneNumber: string;
    district: Omit<DistrictType, 'district'>;
    isPrimary: boolean;
};
