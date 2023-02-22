import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../Enums/Route';
import { IUserForm } from './Entities';

export const createUser = (userData: IUserForm): void => {
    Inertia.post(EndpointRoute.CreateUser, userData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const editUser = (id: number, userData: IUserForm): void => {
    Inertia.put(`${EndpointRoute.EditUser}/${id}`, userData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const deleteUser = (userId: number): void => {
    Inertia.post(
        `${EndpointRoute.DeleteUser}/${userId}`,
        {},
        {
            onSuccess: (success) => {
                console.log('Sukses: ', success);
            },
            onError: (error) => {
                console.log('Error: ', error);
            },
        },
    );
};

export const deleteBatchUsers = (userIds: React.Key[]): void => {
    Inertia.post(
        EndpointRoute.DeleteBatchUser,
        {
            ids: userIds,
        },
        {
            onSuccess: (success) => {
                console.log('Sukses: ', success);
            },
            onError: (error) => {
                console.log('Error: ', error);
            },
        },
    );
};
