import React from 'react';

import { PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TCTagIndexProps } from 'apps/backoffice/@contracts/cinema/tag/tag-index.contract';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import {
    deleteBulkTag,
    deleteTag,
} from 'apps/backoffice/app/Modules/Cinema/Tag/Action';
import { MovieIndexRequest } from 'apps/backoffice/src/modules/cinema/requests/movie/movie-index.request';
import dayjs from 'dayjs';
import { ITag } from 'interface-models/movie/tag.interface';
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

const TagsPage: TInertiaPage<TCTagIndexProps> = (props) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<MovieIndexRequest>();
    const isMobile = isMobileScreen();

    const columns: ColumnsType<ITag> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'name',
                order: filters.order,
                sort: filters.sort,
            }),
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
                                href: route(Route.TagDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.TagEdit, { id: record.id }),
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
                                            deleteTag(record.id as number),
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
                        selectedRowKeys && deleteBulkTag(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            title="Tag List"
            topActions={
                <Button
                    icon={<PlusOutlined />}
                    href={Route.TagCreate}
                    type="primary"
                >
                    New Tag
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

export default TagsPage;
