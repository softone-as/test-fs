import React, { useMemo } from 'react';
import { DataTable } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { Route } from '../../Enums/Route';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { formatDate } from '../../Utils/utils';
import dayjs from 'dayjs';

interface IProps extends TInertiaProps {
    data: ILogActivity[];
    meta: IPaginationMeta;
}

type TFilters = {
    menu?: LogActivityMenuEnum;
    start_at?: string;
    end_at?: string;
};

const LogActivityPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
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
                            href: `${Route.LogActivity}/${data.id}`,
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
                        name: 'menu',
                        filterType: 'Select',
                        options: menuOptions,
                        defaultValue: filters.menu,
                    },
                    {
                        name: 'rangeCreateAt',
                        filterType: 'DateRangePicker',
                        range: 10,
                        defaultValue: [
                            filters.start_at && dayjs(filters.start_at),
                            filters.end_at && dayjs(filters.end_at),
                        ],
                    },
                ]}
                onChange={({ rangeCreateAt, ...filtersState }) => {
                    setQueryParams({
                        ...filtersState,
                        start_at: rangeCreateAt?.[0]?.toISOString(),
                        end_at: rangeCreateAt?.[1]?.toISOString(),
                    });
                }}
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
