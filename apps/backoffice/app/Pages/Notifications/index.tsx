import React from 'react';
import { DataTable } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { Badge, Button } from 'antd';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { route, Route } from '../../Common/Route/Route';
import { markReadAllNotification } from '../../Modules/Notification/Action';
import { NotifciationType } from '../../Modules/Notification/Entities';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import {
    TCNotificationIndexProps,
    TNotificationIndexSchema,
} from 'apps/backoffice/@contracts/notification/notification-index.contract';

type TProps = TInertiaProps & TCNotificationIndexProps;

type TFilter = TNotificationIndexSchema;

const NotificationPage: React.FC = (props: TProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilter>();

    const columns: ColumnsType<NotifciationType> = [
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
            title: 'Is Read',
            key: 'isRead',
            render: (data: NotifciationType) => (
                <Badge dot={!data.isRead}></Badge>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '1px',
            render: (data: NotifciationType): React.ReactNode => {
                return (
                    <>
                        <RowActionButtons
                            actions={[
                                {
                                    type: 'view',
                                    href: route(Route.NotificationDetail, {
                                        id: data.id,
                                    }),
                                },
                            ]}
                        />
                    </>
                );
            },
        },
    ];

    const handleMarkRead = (): void => {
        markReadAllNotification();
    };

    const isReadOptions = [
        { label: 'Read', value: 'Read' },
        { label: 'Unread', value: 'Unread' },
    ];

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
            <DataTable
                batchActionMenus={[]}
                filterComponents={[
                    {
                        label: 'Status',
                        type: 'Select',
                        name: 'isRead',
                        options: isReadOptions,
                        placeholder: 'Status',
                        defaultValue: filters.isRead,
                    },
                ]}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props.data}
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default NotificationPage;
