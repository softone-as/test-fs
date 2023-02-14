import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Descriptions, Modal, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { MainLayout } from '../../../Layouts/MainLayout';
import { IUser } from '../../../Modules/User/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { Buttons } from '../../../Components/atoms/Buttons';
import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';
import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute, Route } from 'apps/backoffice/app/Enums/Route';
interface IProps extends TInertiaProps {
    data: IUser;
}

const UserDetailPage: React.FC = (props: IProps) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } =
        props.data;

    const handleDelete = () => {
        Modal.confirm({
            title: 'Delete User',
            content: 'Are you sure to delete this user?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () =>
                Inertia.post(EndpointRoute.DeleteUser, {
                    ids: [id],
                }),
        });
    };

    return (
        <MainLayout
            title="Detail User"
            breadcrumbs={Breadcrumbs.Users.DETAIL}
            topActions={
                <>
                    <Buttons icon={<DeleteOutlined />} onClick={handleDelete}>
                        Delete
                    </Buttons>
                    <Link href={`${Route.EditUser}/${id}`}>
                        <Buttons icon={<EditOutlined />}>Edit</Buttons>
                    </Link>
                </>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="User Info">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="No Telephone">
                            {phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {email}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>

                <Section title="Advanced Information">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="Identity Number">
                            {identityNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                            {gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address Link" span={2}>
                            http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default UserDetailPage;
