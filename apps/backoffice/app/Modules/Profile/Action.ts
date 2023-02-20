import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Enums/Route';
import { IProfileForm } from './Entities';

export const editProfile = (profileData: IProfileForm): void => {
    Inertia.put(Route.EditProfile, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const editProfilePassword = (profileData: IProfileForm): void => {
    Inertia.put(Route.EditProfilePassword, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
