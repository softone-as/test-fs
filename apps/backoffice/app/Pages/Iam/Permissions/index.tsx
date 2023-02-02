import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { FilterSection } from '../../../Components/organisms/FilterSection'
import { Button, MenuProps, Tag } from 'antd';
import { PageHeader } from '../../../Components/molecules/Headers';
import { EditOutlined, EyeOutlined, FileExcelOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModal } from '../../../Utils/modal'
import { iconActionTableStyle } from '../../../Utils/theme';

import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response'
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import { Inertia } from '@inertiajs/inertia';
import type { ColumnsType } from 'antd/es/table'

interface IProps extends TInertiaProps {
    data: PermissionResponse[],
}

const PermissionPage: React.FC = (props: IProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const handleDeleteRow = (id) => {
        return Inertia.get(`/permissions/delete/${id}`)
    }
    const deleteModal = (id) => useModal({ title: 'Are You Sure? ', type: 'confirm', onOk: () => handleDeleteRow(id), onCancel: () => { return } })

    const columns: ColumnsType<PermissionResponse> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Permission Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
            render: (roles: RoleResponse[]) => roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>)
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            sorter: true
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: (value: Omit<PermissionResponse, 'key'>) => {
                return (
                    <Button.Group size='small'>
                        <Button type='link' href={`/permissions/${value.id}`}><EyeOutlined style={iconActionTableStyle} /></Button>
                        <Button type='link' href={`/permissions/edit/${value.id}`}><EditOutlined style={iconActionTableStyle} /></Button>
                        <Button type='text' onClick={() => deleteModal(value.id)}><DeleteOutlined style={iconActionTableStyle} /></Button>
                    </Button.Group>
                )
            }
        }

    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleBatchDelete = () => {
        Inertia.post(`/permissions/deletes`, {
            ids: selectedRowKeys
        })
    }



    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () => useModal({ title: 'Are You Sure? ', type: 'confirm', onOk: () => handleBatchDelete() }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' }
        }
    ]

    return (
        <MainLayout >
            <PageHeader title='Permissions' topActions={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Button size='large' type='primary'>New User</Button>
            ]} />
            <FilterSection
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
            />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data}
                total={props?.meta?.total}
                perPage={props.meta.perPage}
            />
        </MainLayout>
    );
};

export default PermissionPage;
