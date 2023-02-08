import React from 'react';
import { Button, Descriptions, Space } from 'antd';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { MainLayout } from '../../Layouts/MainLayout';
import { PageHeader } from '../../Components/molecules/Headers';
import { IUser } from '../../Modules/User/Entities';
import { defaultSizeSpace } from '../../Utils/theme';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { Buttons } from '../../Components/atoms/Buttons';
import DescriptionContainer from '../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../Components/molecules/Section';

interface IProps extends TInertiaProps {
	data: IUser,
}

const UserDetailPage: React.FC = (props: IProps) => {
	const { id, identityNumber, email, fullname, phoneNumber, gender } = props.data

	return (
		<MainLayout breadcrumbItems={Breadcrumbs.Profile.INDEX} >
			<PageHeader title='Profile' topActions={[
				<Buttons icon={<EditOutlined />}>Edit</Buttons>,
				<Buttons icon={<DownloadOutlined />}>Download</Buttons>,
				<Button type='primary'>Action</Button>,
			]} />

			<Space direction='vertical' size={defaultSizeSpace} style={{ width: '100%' }}>
				<Section title='User Info'>
					<DescriptionContainer size='small' bordered column={{ md: 2, xs: 1 }}>
						<Descriptions.Item label='ID'>{id}</Descriptions.Item>
						<Descriptions.Item label='Name'>{fullname}</Descriptions.Item>
						<Descriptions.Item label='No Telephone'>{phoneNumber}</Descriptions.Item>
						<Descriptions.Item label='Email'>{email}</Descriptions.Item>
					</DescriptionContainer>
				</Section>

				<Section title='Advanced Information'>
					<DescriptionContainer size='small' bordered column={{ md: 2, xs: 1 }}>
						<Descriptions.Item label='Identity Number'>{identityNumber}</Descriptions.Item>
						<Descriptions.Item label='Gender'>{gender}</Descriptions.Item>
						<Descriptions.Item label='Address Link' span={2}>
							http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts
						</Descriptions.Item>
					</DescriptionContainer>
				</Section>
			</Space>

		</MainLayout>
	);
};

export default UserDetailPage;
