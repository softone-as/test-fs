import React from 'react';
import { Descriptions, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { MainLayout } from '../../Layouts/MainLayout';
import { IUser } from '../../Modules/User/Entities';
import { defaultSizeSpace } from '../../Utils/theme';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { Buttons } from '../../Components/atoms/Buttons';
import DescriptionContainer from '../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../Components/molecules/Section';
import { Route } from '../../Enums/Route';

interface IProps extends TInertiaProps {
    data: IUser;
}

const UserDetailPage: React.FC = (props: IProps) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } =
        props.data;

    return (
        <MainLayout
            title="Profile"
            breadcrumbs={Breadcrumbs.Profile.INDEX}
            topActions={
                <>
                    <Buttons
                        type="primary"
                        href={Route.EditProfile}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Buttons>
                    <Buttons
                        href={Route.EditProfilePassword}
                        icon={<EditOutlined />}
                    >
                        Edit Password
                    </Buttons>
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
