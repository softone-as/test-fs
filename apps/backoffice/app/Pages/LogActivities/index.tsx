import React, { useMemo } from 'react';
import { DataTable } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { route, Route } from '../../Common/Route/Route';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { formatDate } from '../../Utils/utils';
import dayjs from 'dayjs';
import {
    TCLogActivityIndexProps,
    TLogActivityIndexSchema,
} from 'apps/backoffice/@contracts/log-activity/log-activity-index.contract';

type TProps = TInertiaProps & TCLogActivityIndexProps;

type TFilters = TLogActivityIndexSchema;

const LogActivityPage: React.FC = (props: TProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();

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
            title: 'User ID',
            key: 'user',
            render: (data: ILogActivity) => <>{data.user?.id || '-'}</>,
        },
        {
            title: 'Created At',
            key: 'createdAt',
            render: (data: ILogActivity) => <>{formatDate(data.createdAt)}</>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: (data: ILogActivity) => (
                <RowActionButtons
                    actions={[
                        {
                            type: 'view',
                            href: route(Route.LogActivityDetail, {
                                id: data.id,
                            }),
                            title: 'view',
                        },
                    ]}
                />
            ),
        },
    ];

    const menuOptions = useMemo(() => {
        return Object.keys(LogActivityMenuEnum).map((key) => {
            return {
                label: key,
                value: key,
            };
        });
    }, []);

    return (
        <MainLayout title="Logs" breadcrumbs={Breadcrumbs.LogActivity.INDEX}>
            <DataTable
                batchActionMenus={[]}
                filterComponents={[
                    {
                        label: 'Menu',
                        type: 'Select',
                        name: 'menu',
                        placeholder: 'Menu',
                        options: menuOptions,
                        defaultValue: filters.menu,
                    },
                    {
                        label: 'Created At',
                        type: 'DateRangePicker',
                        name: 'rangeCreateAt',
                        range: 10,
                        defaultValue: [
                            filters.startAt && dayjs(filters.startAt),
                            filters.endAt && dayjs(filters.endAt),
                        ],
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

export default LogActivityPage;
