import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { editProfilePassword } from '../../Modules/Profile/Action';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { createSchemaFieldRule } from 'antd-zod';
import { ProfileEditPasswordSchema } from 'apps/backoffice/@contracts/profile/profile-edit-password.contract';

const FormProfilePage: React.FC = (props: TInertiaProps) => {
    const zodSync = createSchemaFieldRule(ProfileEditPasswordSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editProfilePassword(data);
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
        <Layout
            title="Edit Password"
            breadcrumbs={Breadcrumbs.Profile.EDITPASSWORD}
        >
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    errors={props.error}
                    layout="vertical"
                    centered
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
                        label="Password"
                        name="password"
                        rules={[zodSync]}
                        required
                    >
                        <Input.Password type="password" placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="Password Confirmation"
                        name="passwordConfirm"
                        rules={[zodSync]}
                        required
                    >
                        <Input.Password type="password" placeholder="Input" />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormProfilePage;
