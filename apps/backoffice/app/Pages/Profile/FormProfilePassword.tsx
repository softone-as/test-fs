import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../Utils/utils';
import { PageHeader } from '../../Components/molecules/Headers';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { IProfileFormPassword } from '../../Modules/Profile/Entities';
import { editProfilePassword } from '../../Modules/Profile/Action';

const schema: yup.SchemaOf<IProfileFormPassword> = yup.object().shape({
    password: yup
        .string()
        .required('Field password is required')
        .min(8, 'Password at least have 8 character')
        .test(
            'isFormatValid',
            'At least password has include 1 number and Alphabet',
            (value) => {
                const hasUpperCase = /[A-Z]/.test(value);
                const hasNumber = /[0-9]/.test(value);

                if (hasNumber && hasUpperCase) {
                    return true;
                }

                return false;
            },
        ),
});

const FormProfilePage: React.FC = () => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editProfilePassword(data);
            notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Layout breadcrumbItems={Breadcrumbs.Profile.EDITPASSWORD}>
            <PageHeader title="Edit Password" />

            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
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
                        rules={[yupSync]}
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
