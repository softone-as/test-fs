import { Button, Col, Form, Input, Row } from 'antd';
import React, { useContext, useState } from 'react';
import { Section } from '../../../Components/molecules/Section';
import { DataTable } from '../../../Components/organisms/DataTable';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { ColumnsType } from 'antd/es/table';
import { AppContext } from '../../../Contexts/App';
import { createRole } from 'apps/backoffice/app/Modules/Role/Action';
import {
    RoleCreateSchema,
    TCRoleCreateProps,
} from 'apps/backoffice/@contracts/iam/role/role-create.contract';
import { createSchemaFieldRule } from 'antd-zod';

type TProps = TInertiaProps & TCRoleCreateProps;

const columns: ColumnsType<TProps['permissions'][number]> = [
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

const CreateRolePage: React.FC = (props: TProps) => {
    const zodSync = createSchemaFieldRule(RoleCreateSchema);
    const dataPermission = props.permissions;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const [dataSource, setDataSource] = useState(dataPermission);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);
        const data = form.getFieldsValue();
        data.permissionIds = selectedRowKeys as number[];

        try {
            await form.validateFields();
            createRole(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const filterData = (value: string): void => {
        if (value) {
            const filteredData = dataPermission.filter(
                (entry) =>
                    entry.name.toLowerCase().includes(value.toLowerCase()) ||
                    entry.key.toLowerCase().includes(value.toLowerCase()),
            );
            setDataSource(filteredData);
        }
    };

    const onReset = (): void => {
        form.resetFields();
    };

    return (
        <Layout title="Add New Role" breadcrumbs={Breadcrumbs.Roles.CREATE}>
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    errors={props.error}
                    layout="vertical"
                    buttonAction={[
                        <Button onClick={onReset}>Cancel</Button>,
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Row gutter={32}>
                        {/* Row 1 */}
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item
                                rules={[zodSync]}
                                required
                                label="Role Name"
                                name="name"
                            >
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item
                                rules={[zodSync]}
                                required
                                label="Key"
                                name="key"
                            >
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Section title="Permissions">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `Selected ${selectedRowKeys.length} items`
                                : ''}
                        </span>
                        <DataTable
                            columns={columns}
                            dataSource={dataSource}
                            rowSelection={rowSelection}
                            rowKey={'id'}
                            onChange={(e): void => {
                                e.search && filterData(e.search);
                            }}
                        />
                    </Section>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default CreateRolePage;
