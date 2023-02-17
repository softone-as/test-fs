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
import { editRole } from 'apps/backoffice/app/Modules/Role/Action';
import { DataTable } from 'apps/backoffice/app/Components/organisms/DataTable';
import { IPermission } from 'interface-models/iam/permission.interface';
import { ColumnsType } from 'antd/es/table';

const schema: yup.SchemaOf<IRoleForm> = yup.object().shape({
    name: yup.string().required('Field role name is required'),
    key: yup.string().required('Field key is required'),
    permissions: yup
        .array()
        .of(yup.number().required('Field roles is required')),
});

interface IProps extends TInertiaProps {
    data: IRole;
    permissions: IPermission[];
}

const columns: ColumnsType<IPermission> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Permission Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'key',
        dataIndex: 'key',
        key: 'key',
    },
];

const EditRolePage: React.FC = (props: IProps) => {
    const { id, key, name } = props.data;
    const dataPermission = props.permissions;

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editRole(data, id, selectedRowKeys);
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
        <Layout title="Edit Role" breadcrumbs={Breadcrumbs.Roles.EDIT}>
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
                        initialValue={name}
                    >
                        <Input placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="key"
                        name="key"
                        rules={[yupSync]}
                        required
                        initialValue={key}
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                </FormContainer>
            </Section>

            <Section title="Permissions">
                <span style={{ marginLeft: 8 }}>
                    {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ''}
                </span>
                <DataTable<IPermission>
                    columns={columns}
                    dataSource={dataPermission}
                    rowSelection={rowSelection}
                    rowKey={'id'}
                />
            </Section>
        </Layout>
    );
};

export default EditRolePage;
