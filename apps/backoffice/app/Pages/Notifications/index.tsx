import React from 'react';
import { DataTable, TOnSort } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { FilterSection } from '../../Components/organisms/FilterSection';
import { Badge, Button, Select } from 'antd';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { Route } from '../../Enums/Route';
import { markReadAllNotification } from '../../Modules/Notification/Action';
import { NotifciationType } from '../../Modules/Notification/Entities';

interface IProps extends TInertiaProps {
    data: NotifciationType[];
    meta: IPaginationMeta;
}

const NotificationPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter<Partial<NotifciationType>>();
    console.log(filters.isRead);

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
            render: (data: NotifciationType) => {
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

    const handleFilterRead = (data: string) => {
        return setQueryParams({ isRead: data });
    };

    const handleSort = (sorter: TOnSort<NotifciationType>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

    const handleMarkRead = () => {
        markReadAllNotification();
    };

    const readOptions = [
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
            <FilterSection
                batchActionMenus={[]}
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
