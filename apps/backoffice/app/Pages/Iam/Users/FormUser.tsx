/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Inertia } from '@inertiajs/inertia';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { usePage } from '@inertiajs/inertia-react';

// import { EndpointRoute } from '../../../Enums/Route';

import { MainLayout } from '../../../Layouts/MainLayout';

// import {
//     FormUserType,
// } from '../../../modules/User/Entity/User';
// import {
//     ErrorType,
//     SuccessType,
// } from '../../../modules/Common/Entity/Common';

// import { notifySuccess, setServerError } from '../../../Utils/utils';

// import useLoading from '../../../modules/Hook/useLoading';
// import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
// import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

// type FormUserProps = {
//     data: Omit<UserResponse, 'password'>;
//     roles: Omit<RoleResponse, 'permissions'>[];
//     isUpdate?: boolean;
//     id: string;
// };

// const schema = yup.object().shape({
//     fullname: yup.string().required('Field Nama wajib diisi'),
//     email: yup
//         .string()
//         .required('Field Email User wajib diisi'),
//     phoneNumber: yup.string().required('Field Phon Number Telpon wajib diisi'),
//     roleId: yup.string().required('Field Role wajib diisi'),
// });

const FormUser: React.FC = () => {


    return (
        <MainLayout >
            <h1>Hallo</h1>
        </MainLayout>
    );
};

export default FormUser;
