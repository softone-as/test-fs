import React, { useState } from 'react';
import { DataTable } from '../Components/organisms/DataTable';
import { MainLayout } from '../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { useTableFilter } from '../Utils/hooks';
import { useModal } from '../Utils/modal';
import { FilterSection } from '../Components/organisms/FilterSection';
import { Button, MenuProps, Select } from 'antd';
import {
    DateRangePicker,
    DatePicker,
    TRangeValue,
} from '../Components/molecules/Pickers';
import type { Dayjs } from 'dayjs';
import { MultiFilterDropdown } from '../Components/molecules/Dropdowns';
import { PageHeader } from '../Components/molecules/Headers';
import {
    FileExcelOutlined,
    QuestionCircleOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Form, Typography, Space } from 'antd';
import { Breadcrumbs } from '../Enums/Breadcrumb';
import { RowActionButtons } from '../Components/molecules/RowActionButtons';
import { CheckboxDropdown } from '../Components/molecules/Dropdowns/CheckboxDropdown';

type DataType = {
    birthDate: string;
    email: string;
    emailVerifiedAt: string;
    fullname: string;
    gender: string;
    id: number;
    identityNumber: string;
    oneSignalPlayerIds: string;
    password: string;
    phoneNumber: string;
    phoneNumberVerifiedAt: string;
    categories: string;
};

interface IProps extends TInertiaProps {
    data: DataType[];
}

const DashboardPage: React.FC<IProps> = (props: IProps) => {
    const { setQueryParams, filters } = useTableFilter<DataType>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: () => (
                <RowActionButtons
                    actions={[
                        {
                            type: 'view',
                            href: `#`,
                            title: 'view',
                        },
                        {
                            type: 'edit',
                            href: `#`,
                            title: 'edit',
                        },
                        {
                            type: 'delete',
                            title: 'delete',
                            onClick: () => {
                                // TODO : handle delete function
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    const handleSearch = (val) => {
        return setQueryParams({ search: val });
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'warning',
                    onOk: () => alert('Ok Delete'),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    const handleRange = (val: TRangeValue) =>
        console.log(val.map((item) => item.toDate()));
    const handleDate = (val: Dayjs) => console.log(val.toDate());

    const handleStatus = (data) => {
        console.log('DATa Status: ', data);
    };

    const [form] = Form.useForm<{ status: string }>();

    const handleFinish = (values) => {
        console.log('FINSIH : ', values);
    };

    return (
        <MainLayout breadcrumbItems={Breadcrumbs.Dashboard.INDEX}>
            <PageHeader
                title="Permissions"
                topActions={[
                    <Button
                        size="large"
                        icon={<FileExcelOutlined />}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Import
                    </Button>,
                    <Button size="large" type="primary">
                        New User
                    </Button>,
                ]}
            />
            <FilterSection
                searchHandler={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={[
                    <CheckboxDropdown
                        onChange={(value) => {
                            setQueryParams({ categories: value.join(',') });
                        }}
                        value={filters.categories?.split(',')}
                        label="Category"
                        options={[
                            { label: 'Category 1', value: 'category 1' },
                            { label: 'Category 2', value: 'category 2' },
                            { label: 'Category 3', value: 'category 3' },
                            { label: 'Category 4', value: 'category 4' },
                        ]}
                    />,
                    <MultiFilterDropdown
                        form={form}
                        title="Filter"
                        initialValues={{ status: '' }}
                        onFinish={handleFinish}
                        onReset={() => console.log('Hello')}
                        fieldsForm={[
                            <Form.Item
                                label={
                                    <Space size="small">
                                        <Typography.Text>
                                            Status
                                        </Typography.Text>{' '}
                                        <QuestionCircleOutlined
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                        />
                                        <Typography.Text
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                        >
                                            (optional)
                                        </Typography.Text>
                                    </Space>
                                }
                                name="status"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={[
                                        { label: 'Done', value: 'done' },
                                        { label: 'Pending', value: 'pending' },
                                    ]}
                                    onChange={handleStatus}
                                    allowClear
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>,
                            <Form.Item label="Status" name="status">
                                <Select
                                    options={[
                                        { label: 'Done', value: 'done' },
                                        { label: 'Pending', value: 'pending' },
                                    ]}
                                    onChange={handleStatus}
                                    allowClear
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>,
                            <Form.Item label="Status" name="status">
                                <Select
                                    options={[
                                        { label: 'Done', value: 'done' },
                                        { label: 'Pending', value: 'pending' },
                                    ]}
                                    onChange={handleStatus}
                                    allowClear
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>,
                        ]}
                    />,

                    <DateRangePicker range={10} onChange={handleRange} />,
                    <DatePicker onChange={handleDate} />,
                ]}
            />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data?.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                total={props?.meta?.total}
                perPage={props?.meta?.perPage}
                onPageChange={(page, pageSize) =>
                    setQueryParams({
                        page: page?.toString(),
                        size: pageSize?.toString(),
                    })
                }
            />
        </MainLayout>
    );
};

export default DashboardPage;
