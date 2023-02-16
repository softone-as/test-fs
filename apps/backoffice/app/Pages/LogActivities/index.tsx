import React from 'react';
import { DataTable } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { useModal } from '../../Utils/modal';
import { Button, MenuProps, Select } from 'antd';
import { DatePicker } from '../../Components/molecules/Pickers';
import { MultiFilterDropdown } from '../../Components/molecules/Dropdowns';
import { FileExcelOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { Route } from '../../Enums/Route';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';

interface IProps extends TInertiaProps {
    data: ILogActivity[];
    meta: IPaginationMeta;
}

const LogActivityPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter<Partial<ILogActivity>>();

    const columns: ColumnsType<ILogActivity> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Menu',
            dataIndex: 'menu',
            key: 'menu',
        },
        {
            title: 'Activity',
            dataIndex: 'activity',
            key: 'activity',
        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
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
                            href: `${Route.LogActivity}/1`, // TODO: endpoint dinamis by id
                            title: 'view',
                        },
                    ]}
                />
            ),
        },
    ];

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

    const handleMenu = (data) => {
        console.log('Data menu: ', data);
    };

    const [form] = Form.useForm<{ status: string }>();

    const handleFinish = (values) => {
        console.log('FINSIH : ', values);
    };
    return (
        <MainLayout
            title="Logs"
            breadcrumbs={Breadcrumbs.LogActivity.INDEX}
            topActions={
                <Button
                    type="primary"
                    size="large"
                    icon={<FileExcelOutlined />}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Export
                </Button>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        name: 'status',
                        render: () => (
                            <MultiFilterDropdown
                                form={form}
                                title="Filter"
                                initialValues={{ status: '' }}
                                onFinish={handleFinish}
                                onReset={() => console.log('Hello')}
                                fieldsForm={[
                                    <Form.Item label="Menu" name="menu">
                                        <Select
                                            options={[
                                                {
                                                    label: 'ROLE',
                                                    value: 'ROLE',
                                                },
                                                {
                                                    label: 'PERMISSION',
                                                    value: 'PERMISSION',
                                                },
                                            ]}
                                            onChange={handleMenu}
                                            allowClear
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>,
                                ]}
                            />
                        ),
                    },
                    {
                        name: 'rangeCreateAt',
                        filterType: 'DateRangePicker',
                        range: 10,
                    },
                    {
                        name: 'date',
                        render: DatePicker,
                    },
                ]}
                onChange={setQueryParams}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default LogActivityPage;
