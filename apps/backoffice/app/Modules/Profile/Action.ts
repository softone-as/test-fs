import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../Enums/Route';
import { IProfileForm } from './Entities';

export const editProfile = (profileData: IProfileForm): void => {
    console.log(profileData);
    Inertia.put(EndpointRoute.EditProfile, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const editProfilePassword = (profileData: IProfileForm): void => {
    Inertia.put(EndpointRoute.EditProfilePassword, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
