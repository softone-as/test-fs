import { PageHeader } from "../../Components/molecules/Headers";
import { MainLayout } from "../../Layouts/MainLayout/MainLayout";
import { TInertiaProps } from "../../Modules/Inertia/Entities";
import React from "react";

interface IProps extends TInertiaProps {
	data: {
		fullname: string
	}
}

const ProfilePage: React.FC = (props: IProps) => {
	return (
		<MainLayout>
			<PageHeader title={"Profile Page" + (props.data.fullname && `: ${props.data.fullname}`)} />
		</MainLayout>
	);
};

export default ProfilePage;