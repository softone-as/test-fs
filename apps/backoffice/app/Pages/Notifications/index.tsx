import React from 'react';
import { DataTable, TOnSort } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { FilterSection } from '../../Components/organisms/FilterSection';
import { Badge, Button, MenuProps, Select } from 'antd';
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
        filters,
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
            title: 'Is Read',
            key: 'isRead',
            render: (data: IInAppNotification) => (
                <Badge dot={!data.isRead}></Badge>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '1px',
            render: (data: IInAppNotification) => {
                return (
                    <>
                        <RowActionButtons
                            actions={[
                                {
                                    type: 'view',
                                    href: `${Route.Notification}/${data.id}`,
                                },
                            ]}
                        />
                    </>
                );
            },
        },
    ];

    const handleFilterRead = (data: boolean) => {
        return setQueryParams({ isRead: data });
    };

    const handleSort = (sorter: TOnSort<IInAppNotification>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

    const batchActionMenus: MenuProps['items'] = [];

    const handleMarkRead = () => {
        markReadAllNotification();
    };

    const readOptions = [
        { label: 'Read', value: true },
        { label: 'Unread', value: false },
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
            <FilterSection
                batchActionMenus={batchActionMenus}
                filters={[
                    <Select
                        placeholder="Read"
                        defaultValue={filters.isRead}
                        options={readOptions}
                        onChange={handleFilterRead}
                        allowClear
                        style={{ width: '90px' }}
                    />,
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
