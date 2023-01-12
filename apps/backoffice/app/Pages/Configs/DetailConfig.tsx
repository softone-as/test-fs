import React, { useState } from 'react';

import Layout from '../../Layouts/Main';

import { PERMISSION_BACKOFFICE_UPDATE_CONFIG } from '../../../../../constants/permission.constant';

import TextBox from '../../Components/atoms/Box/TextBox.atom';
import Container from '../../Components/atoms/Containers/Container.atom';
import HeaderText from '../../Components/molecules/Text/HeaderText.molecule';
import ActionButtons from '../../Components/molecules/DataTable/ActionButtons.molecule';
import { Route } from '../../Enums/Route';
import { usePage } from '@inertiajs/inertia-react';
import { ConfigResponse } from '../../../src/modules/config/responses/config.response';

type ConfigDetailPageProps = {
    data: ConfigResponse;
};

const ConfigDetailPage: React.FC<ConfigDetailPageProps> = ({ data }) => {
    const id = data?.id;

    const { userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    return (
        <Layout title={data.name}>
            <div className="page__center">
                <HeaderText title="Detail Config" />
                <Container>
                    <ActionButtons
                        position="flex-end"
                        updateLink={`${Route.EditConfig}/${id}`}
                        onDelete={null}
                        hideDelete={true}
                        hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_CONFIG)}
                    />
                    <div
                        className="row align-items-start gy-2"
                        style={{ margin: '20px' }}
                    >
                        <TextBox title="ID Config" content={data.id} />
                        <TextBox
                            title="Nama Config"
                            content={data.name}
                        />
                        <TextBox
                            title="Key"
                            content={data.key}
                        />
                        <TextBox
                            title="Value"
                            content={data.value}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default ConfigDetailPage;
