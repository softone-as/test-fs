import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../../Utils/utils';

import { FormContainer } from '../../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { IRole } from 'interface-models/iam/role.interface';
import { Section } from '../../../Components/molecules/Section';
import { AppContext } from '../../../Contexts/App';
import { IRoleForm } from 'apps/backoffice/app/Modules/Role/Entities';
import { createRole } from 'apps/backoffice/app/Modules/Role/Action';

const schema: yup.SchemaOf<IRoleForm> = yup.object().shape({
    name: yup.string().required('Field role name is required'),
    key: yup.string().required('Field key is required'),
});

interface IProps extends TInertiaProps {
    roles: IRole[];
}

const FormUserPage: React.FC = (props: IProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            // TODO: do post API
            createRole(data);
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
        <Layout title="Add New Role" breadcrumbs={Breadcrumbs.Roles.CREATE}>
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
                            disabled={isLoading}
                        >
                            Submit
                        </Button>,
                    ]}
                    disabled={isLoading}
                    errors={props.error}
                >
                    <Form.Item
                        label="Role Name"
                        name="name"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="key"
                        name="key"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormUserPage;
