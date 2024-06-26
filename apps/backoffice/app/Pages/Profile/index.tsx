import React from 'react';
import { Descriptions, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { MainLayout } from '../../Layouts/MainLayout';
import { defaultSizeSpace } from '../../Utils/theme';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Button } from '../../Components/atoms/Button';
import DescriptionContainer from '../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../Components/molecules/Section';
import { Route } from '../../Common/Route/Route';
import { TInertiaPage } from '../../Modules/Common/Entities';
import { TCUserDetailProps } from 'apps/backoffice/@contracts/iam/user/user-detail.contract';

const UserDetailPage: TInertiaPage<TCUserDetailProps> = (props) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } =
        props.data;

    return (
        <MainLayout
            title="Profile"
            breadcrumbs={Breadcrumbs.Profile.INDEX}
            topActions={
                <>
                    <Button
                        type="primary"
                        href={Route.ProfileEdit}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        href={Route.ProfileEditPassword}
                        icon={<EditOutlined />}
                    >
                        Edit Password
                    </Button>
                </>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="Profile Info">
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
                        <Descriptions.Item label="Identity Number">
                            {identityNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                            {gender}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default UserDetailPage;
