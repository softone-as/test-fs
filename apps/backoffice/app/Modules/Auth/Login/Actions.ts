import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../../Enums/Route';

export const doLogin = (loginData): void => {
    Inertia.post(Route.AdminLogin + `?one_signal_player_id=`, loginData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
