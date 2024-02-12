import { Button, Form, Input, Select } from 'antd';
import React, { useContext, useState } from 'react';

import { FormContainer } from '../../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';

import { createUser, editUser } from '../../../Modules/User/Action';

import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Section } from '../../../Components/molecules/Section';
import { AppContext } from '../../../Contexts/App';
import { IRole } from '../../../../../../interface-models/iam/role.interface';
import { IUser } from '../../../Modules/Profile/Entities';
import { createSchemaFieldRule } from 'antd-zod';
import { UserCreateSchema } from '../../../../@contracts/iam/create-user.schema';

// const schema: yup.SchemaOf<IUserForm> = yup.object().shape({
//     fullname: yup.string().required('Field fullname is required'),
//     password: yup
//         .string()
//         .required('Field password is required')
//         .min(8, 'Password at least have 8 character')
//         .test(
//             'isFormatValid',
//             'At least password has include 1 number and Alphabet',
//             (value) => {
//                 if (!value) return false;

//                 const hasUpperCase = /[A-Z]/.test(value);
//                 const hasNumber = /[0-9]/.test(value);

//                 if (hasNumber && hasUpperCase) {
//                     return true;
//                 }

//                 return false;
//             },
//         ),
//     email: yup.string().email().required('Field email is required'),
//     phoneNumber: yup.string().required('Field phone number is required'),
//     roles: yup.array().of(yup.number().required('Field roles is required')),
// });

interface IProps extends TInertiaProps {
    roles: IRole[];
    data?: IUser;
    isUpdate: boolean;
}

const FormUserPage: React.FC = (props: IProps) => {
    const zodSync = createSchemaFieldRule(UserCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            props.isUpdate && props.data?.id
                ? editUser(props.data.id, data)
                : createUser(data);
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
            title={props.isUpdate ? 'Edit User' : 'Add New User'}
            breadcrumbs={
                props.isUpdate
                    ? Breadcrumbs.Users.EDIT
                    : Breadcrumbs.Users.CREATE
            }
        >
            <Section>
                <FormContainer
                    initialValues={{
                        ...props.data,
                        roles: props.data?.roles?.map((role) => role.id),
                        password: undefined,
                    }}
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
                        label="Password"
                        name="password"
                        rules={[zodSync]}
                        required
                    >
                        <Input.Password placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[zodSync]}
                        required
                    >
                        <Input style={{ width: '100%' }} placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="Roles"
                        name="roles"
                        rules={[zodSync]}
                        required
                    >
                        <Select placeholder="Select" mode="multiple">
                            {props.roles.map((role) => (
                                <Select.Option value={role.id} key={role.id}>
                                    {role.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormUserPage;
