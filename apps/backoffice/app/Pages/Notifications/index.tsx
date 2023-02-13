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
import { markReadAllNotification } from '../../Modules/Notification/Action';

interface IProps extends TInertiaProps {
    data: IInAppNotification[];
    meta: IPaginationMeta;
}

const NotificationPage: React.FC = (props: IProps) => {
    console.log(props.notifications.notificationUnread);
    const {
        setQueryParams,
        status: { isFetching },
    } = useTableFilter<Partial<IInAppNotification>>();

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
            width: '100px',
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
                        <Badge dot={!data.isRead}></Badge>
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

    const handleMarkRead = () => {
        markReadAllNotification(
            props.data.map((data) => {
                return data.id;
            }),
        );
    };

    return (
        <MainLayout
            title="Notification"
            breadcrumbs={Breadcrumbs.Notification.INDEX}
            topActions={
                <Button
                    onClick={handleMarkRead}
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
