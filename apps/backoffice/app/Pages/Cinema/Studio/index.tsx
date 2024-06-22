import React from 'react';

import { PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TCStudioIndexProps } from 'apps/backoffice/@contracts/cinema/studio/studio-index.contract';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import {
    deleteBulkStudio,
    deleteStudio,
} from 'apps/backoffice/app/Modules/Cinema/Studio/Action';
import { StudioIndexRequest } from 'apps/backoffice/src/modules/cinema/requests/studio/studio-index.request';
import dayjs from 'dayjs';
import { IStudio } from 'interface-models/movie/studio.interface';
import { FORMAT_DATE_BASE } from '../../../Common/Constants/formatter.constant';
import { Route, route } from '../../../Common/Route/Route';
import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { showModal } from '../../../Utils/modal';
import { isMobileScreen } from '../../../Utils/utils';

const StudiosPage: TInertiaPage<TCStudioIndexProps> = (props) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<StudioIndexRequest>();
    const isMobile = isMobileScreen();

    const columns: ColumnsType<IStudio> = [
        {
            title: 'Studio Number',
            dataIndex: 'studioNumber',
            key: 'studioNumber',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'studioNumber',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Seat Capacity',
            dataIndex: 'seatCapacity',
            key: 'seatCapacity',
        },
        {
            title: 'Created At',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) =>
                createdAt ? dayjs(createdAt).format(FORMAT_DATE_BASE) : '-',
        },
        {
            title: 'Updated At',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            render: (updatedAt) =>
                updatedAt ? dayjs(updatedAt).format(FORMAT_DATE_BASE) : '-',
        },
        {
            title: isMobile ? null : 'Action',
            key: 'action',
            width: '142px',
            render: (text, record): React.ReactNode => {
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: route(Route.StudioDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.StudioEdit, {
                                    id: record.id,
                                }),
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: (): void => {
                                    showModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        variant: 'danger',
                                        onOk: () =>
                                            deleteStudio(record.id as number),
                                    });
                                },
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                showModal({
                    title: 'Are You Sure?',
                    type: 'confirm',
                    variant: 'danger',
                    onOk: () =>
                        selectedRowKeys && deleteBulkStudio(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            title="Studio List"
            topActions={
                <Button
                    icon={<PlusOutlined />}
                    href={Route.StudioCreate}
                    type="primary"
                >
                    New Studio
                </Button>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={implementTableFilter}
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

export default StudiosPage;
