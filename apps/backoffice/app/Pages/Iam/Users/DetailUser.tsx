import { Route } from '../../../Enums/Route';
import React from 'react';

import { MainLayout } from '../../../Layouts/MainLayout';

// import {
//     PERMISSION_BACKOFFICE_DELETE_USER,
//     PERMISSION_BACKOFFICE_UPDATE_USER
// } from '../../../../../../constants/permission.constant';

// import TextBox from '../../../Components/atoms/Box/TextBox.atom';
// import Container from '../../../Components/atoms/Containers/Container.atom';
// import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';
// import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
// import { EndpointRoute, Route } from '../../../Enums/Route';
// import { confirmDelete, formatCurrency, notifyError, notifySuccess } from '../../../Utils/utils';
// import { Inertia } from '@inertiajs/inertia';
// import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
// import { Link, usePage } from '@inertiajs/inertia-react';
// import { UserResponse } from '../../../../src/modules/iam/responses/user.response';

// type UserDetailPageProps = {
//     data: UserResponse;
// };

const UserDetailPage: React.FC = () => {
    // const id = data?.id;
    // const { userDetail } = usePage().props
    // const permissionAllowActionList = userDetail['role'].permissions.map(permission => permission.key)

    // const handleDeleteUser = (id: string) => {
    //     if (confirmDelete()) {
    //         Inertia.get(`${EndpointRoute.DeleteUser}/${id}`, {}, {
    //             onSuccess: (res) => {
    //                 const error = res.props['error'] || null
    //                 const success = res.props['success'] || null

    //                 if (success) {
    //                     const message = (res.props.success as SuccessType)
    //                         .message;
    //                     notifySuccess(message);
    //                 } else if (error) {
    //                     const message = (res.props.error as ErrorType)
    //                         .message;
    //                     notifyError(message);
    //                 }
    //             },
    //         });
    //     }
    // };

    // const permissionList = data?.role.permissions.map((permission) => {
    //     return (
    //         <li key={permission.id} >
    //             <Link href={`${EndpointRoute.Permission}/${permission.id}`}>{permission.name}</Link>
    //         </li>
    //     )
    // })

    return (
        <MainLayout
            title="Detail User"
            breadcrumbs={[
                { title: 'User List', to: Route.Users },
                { title: 'Detail User' },
            ]}
        >
            <h1>Hai</h1>
        </MainLayout>
    );
};

export default UserDetailPage;
