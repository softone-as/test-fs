import { Button, Form, Input, Radio } from 'antd';
import React, { useContext, useState } from 'react';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { editProfile } from '../../Modules/Profile/Action';
import { GenderEnum } from '../../../../../interface-models/iam/user.interface';
import { BasicDatePicker } from '../../Components/molecules/Pickers/BasicDatePicker';
import { createSchemaFieldRule } from 'antd-zod';
import {
    ProfileEditSchema,
    TProfileEditSchema,
} from 'apps/backoffice/@contracts/profile/profile-edit.contract';
import { TCProfileDetailProps } from 'apps/backoffice/@contracts/profile/profile-detail.contract';

type TProps = TInertiaProps & TCProfileDetailProps;

const FormProfilePage: React.FC = (props: TProps) => {
    const zodSync = createSchemaFieldRule(ProfileEditSchema);
    const [form] = Form.useForm<TProfileEditSchema>();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editProfile(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onReset = (): void => {
        form.resetFields();
    };

    return (
        <Layout title="Edit Profile" breadcrumbs={Breadcrumbs.Profile.EDIT}>
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    centered
                    initialValues={props.data}
                    errors={props.error}
                    buttonAction={[
                        <Button onClick={onReset}>Discard</Button>,
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                form
                                    .getFieldsError()
                                    .filter(({ errors }) => errors.length)
                                    .length > 0 && isLoading
                            }
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[zodSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[zodSync]}
                        required
                    >
                        <Input type="email" placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[zodSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Identity Number"
                        name="identityNumber"
                        rules={[zodSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender" required>
                        <Radio.Group>
                            <Radio.Button value={GenderEnum.LakiLaki}>
                                {GenderEnum.LakiLaki}
                            </Radio.Button>
                            <Radio.Button value={GenderEnum.Perempuan}>
                                {GenderEnum.Perempuan}
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Birth Date"
                        name="birthDate"
                        rules={[zodSync]}
                    >
                        <BasicDatePicker />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormProfilePage;
