/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../../Utils/utils';

import { PageHeader } from '../../../Components/molecules/Headers';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

import { createUser } from '../../../Modules/User/Action';

import { IUserForm } from '../../../Modules/User/Entities';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { IRole } from 'interface-models/iam/role.interface';

const schema: yup.SchemaOf<IUserForm> = yup.object().shape({
    fullname: yup.string().required('Field fullname is required'),
    password: yup.string().required('Field password is required').min(8, 'Password at least have 8 character')
        .test('isFormatValid', 'At least password has include 1 number and Alphabet', (value, context) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);

            if (hasNumber && hasUpperCase) {
                return true
            }

            return false
        }),
    email: yup.string().email().required('Field email is required'),
    phoneNumber: yup.string().required('Field phone number is required'),
    roles: yup.array().of(yup.number().required('Field roles is required'))
})

interface IProps extends TInertiaProps {
    roles: IRole[],
}

const FormUserPage: React.FC = (props: IProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)

    const onFinish = async () => {
        setIsLoading(true)
        const data = form.getFieldsValue()

        try {
            await form.validateFields()
            // TODO: do post API
            createUser(data)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
        }
    };

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Layout breadcrumbItems={Breadcrumbs.Users.CREATE}>
            <PageHeader title='Add New User' />

            {/* Implement Form User */}
            <FormContainer
                onFinish={onFinish}
                form={form}
                layout='vertical'
                centered
                buttonAction={[
                    <Button onClick={onReset}>
                        Discard
                    </Button>,
                    <Button type="primary" htmlType="submit" disabled={form.getFieldsError().filter(({ errors }) => errors.length).length > 0} >
                        Submit
                    </Button>
                ]}
            >
                <Form.Item label="Full Name" name='fullname' rules={[yupSync]} required>
                    <Input placeholder='Input' />
                </Form.Item>

                <Form.Item label="Email" name='email' rules={[yupSync]} required>
                    <Input type='email' placeholder='Input' />
                </Form.Item>

                <Form.Item label="Password" name='password' rules={[yupSync]} required>
                    <Input.Password placeholder='Input' />
                </Form.Item>

                <Form.Item label="Phone Number" name='phoneNumber' rules={[yupSync]} required>
                    <Input style={{ width: '100%' }} placeholder='Input' />
                </Form.Item>

                <Form.Item label="Roles" name='roles' rules={[yupSync]} required>
                    <Select placeholder='Select' mode='multiple'>
                        {props.roles.map(role => (
                            <Select.Option value={role.id} key={role.id}>{role.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

            </FormContainer>
        </Layout >
    );
};

export default FormUserPage;
