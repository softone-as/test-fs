import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Enums/Route';
import { IUserForm } from './Entities';

export const createUser = (userData: IUserForm): void => {
    Inertia.post(Route.CreateUser, userData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
