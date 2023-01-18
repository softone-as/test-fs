import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../../Enums/Route';

export const doLogin = (loginData): void => {
    Inertia.post(
        EndpointRoute.AdminLogin + `?one_signal_player_id=`,
        loginData,
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
