import React, { useMemo, useState } from 'react';
import { DataTable, TOnSort } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useTableFilter } from '../../Utils/hooks';
import { useModal } from '../../Utils/modal';
import { FilterSection } from '../../Components/organisms/FilterSection';
import { MenuProps, Select } from 'antd';
import {
    DateRangePicker,
    TRangeValue,
} from '../../Components/molecules/Pickers';
import { ShareAltOutlined } from '@ant-design/icons';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { Route } from '../../Enums/Route';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';

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

    const handleSearch = (value: string) => {
        return setQueryParams({ search: value });
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

    const handleFilterMenu = (data: string) => {
        return setQueryParams({ menu: data });
    };

    const handleSort = (sorter: TOnSort<ILogActivity>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

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
            <FilterSection
                searchValue={filters.search}
                onSearch={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={[
                    <Select
                        placeholder="Menu"
                        defaultValue={filters.menu}
                        options={menuOptions}
                        onChange={handleFilterMenu}
                        allowClear
                        style={{ width: '90px' }}
                    />,
                    <DateRangePicker range={10} onChange={handleRange} />,
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
