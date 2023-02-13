import React from 'react';
import { DataTable, TOnSort } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { FilterSection } from '../../Components/organisms/FilterSection';
import { Badge, Button, MenuProps, Select } from 'antd';
import {
    DateRangePicker,
    TRangeValue,
} from '../../Components/molecules/Pickers';
import { MultiFilterDropdown } from '../../Components/molecules/Dropdowns';
import { Form } from 'antd';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { Route } from '../../Enums/Route';

interface IProps extends TInertiaProps {
    data: IInAppNotification[];
    meta: IPaginationMeta;
}

const NotificationPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        status: { isFetching },
    } = useTableFilter<Partial<IInAppNotification>>();

    const handleMarkRead = (event) => {
        console.log('Data menu: ', event.target);
    };

    const columns: ColumnsType<IInAppNotification> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Action',
            key: 'action',
            width: '180px',
            render: (data: IInAppNotification) => {
                return (
                    <>
                        <RowActionButtons
                            actions={[
                                {
                                    type: 'view',
                                    href: `${Route.Notification}/${data.id}`,
                                    title: 'view',
                                },
                            ]}
                        />
                        <Button onClick={handleMarkRead} type="ghost">
                            Mark as read
                            <Badge dot={!data.isRead}></Badge>
                        </Button>
                    </>
                );
            },
        },
    ];

    const handleRange = (val: TRangeValue) =>
        console.log(val.map((item) => item.toDate()));

    const handleMenu = (data) => {
        console.log('Data menu: ', data);
    };

    const handleSort = (sorter: TOnSort<IInAppNotification>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

    const batchActionMenus: MenuProps['items'] = [];

    const [form] = Form.useForm<{ status: string }>();

    const handleFinish = (values) => {
        console.log('FINSIH : ', values);
    };

    return (
        <MainLayout
            title="Notification"
            breadcrumbs={Breadcrumbs.Notification.INDEX}
            topActions={
                <Button
                    type="primary"
                    size="large"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Mark as read all
                </Button>
            }
        >
            <FilterSection
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
                                        { label: 'Read', value: 'Read' },
                                        { label: 'Unread', value: 'Unread' },
                                    ]}
                                    onChange={handleMenu}
                                    allowClear
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>,
                        ]}
                    />,

                    <DateRangePicker range={10} onChange={handleRange} />,
                ]}
            />
            <DataTable
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

export default NotificationPage;
