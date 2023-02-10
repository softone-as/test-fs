import React, { useState } from 'react';
import { DataTable, TOnSort } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { useModal } from '../../Utils/modal';
import { FilterSection } from '../../Components/organisms/FilterSection';
import { Button, MenuProps, Select } from 'antd';
import {
    DateRangePicker,
    DatePicker,
    TRangeValue,
} from '../../Components/molecules/Pickers';
import type { Dayjs } from 'dayjs';
import { MultiFilterDropdown } from '../../Components/molecules/Dropdowns';
import { FileExcelOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { Route } from '../../Enums/Route';

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

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

    const handleMenu = (data) => {
        console.log('Data menu: ', data);
    };

    const handleSort = (sorter: TOnSort<ILogActivity>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
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
            <FilterSection
                searchValue={filters.search}
                onSearch={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={[
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
                                        { label: 'ROLE', value: 'ROLE' },
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
                    />,

                    <DateRangePicker range={10} onChange={handleRange} />,
                    <DatePicker onChange={handleDate} />,
                ]}
            />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                meta={props.meta}
                onSort={handleSort}
                onPageChange={(page, pageSize) =>
                    setQueryParams({ page: page, per_page: pageSize })
                }
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default LogActivityPage;
