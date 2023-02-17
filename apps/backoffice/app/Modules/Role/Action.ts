import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../Enums/Route';
import { IRoleForm } from './Entities';

export const createRole = (roleData: IRoleForm, permission: any[]): void => {
    roleData.permissions = permission;
    Inertia.post(EndpointRoute.CreateRole, roleData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const editRole = (
    roleData: IRoleForm,
    id: number,
    permission: any[],
): void => {
    roleData.permissions = permission;
    Inertia.put(EndpointRoute.EditRole + '/' + id, roleData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const deleteRole = (id: number): void => {
    Inertia.delete(EndpointRoute.DeleteRole + '/' + id, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
