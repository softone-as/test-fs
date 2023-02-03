import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { useTableFilter } from '../../../Utils/hooks'
import { useModal } from '../../../Utils/modal'
import { FilterSection } from '../../../Components/organisms/FilterSection'
import { Button, MenuProps, Select } from 'antd';
import { DateRangePicker, DatePicker, TRangeValue } from '../../../Components/molecules/Pickers';
import type { Dayjs } from 'dayjs'
import { MultiFilterDropdown } from '../../../Components/molecules/Dropdowns';
import { PageHeader } from '../../../Components/molecules/Headers';
import { FileExcelOutlined, QuestionCircleOutlined, ShareAltOutlined} from '@ant-design/icons';
import { Form, Typography, Space } from 'antd'
import { Link } from '@inertiajs/inertia-react'
import { IUser } from '../../../Modules/User/Entities';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import RowActionButtons from '../../../Components/molecules/ActionButtons';

interface IProps extends TInertiaProps {
    data: IUser[],
}

const UsersPage: React.FC = (props: IProps) => {

    const { setQueryParams } = useTableFilter<IUser>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: () => (
                <RowActionButtons
                    actions={[
                        {
                            type: 'view',
                            href: `#`,
                            title: 'view'
                        },
                        {
                            type: 'edit',
                            href: `#`,
                            title: 'edit'
                        },
                        {
                            type: 'delete',
                            title: 'delete',
                            onClick: () => {
                                // TODO : handle delete function
                            },
                        },
                    ]}
                />
            ),
        }

    ]

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };



    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () => useModal({ title: 'Are You Sure? ', type: 'warning', onOk: () => alert('Ok Delete') }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' }
        }
    ]

    const handleRange = (val: TRangeValue) => console.log(val.map(item => item.toDate()))
    const handleDate = (val: Dayjs) => console.log(val.toDate())


    const handleStatus = (data) => {
        console.log('DATa Status: ', data)
    }

    const [form] = Form.useForm<{ status: string }>()

    const handleFinish = (values) => {
        console.log('FINSIH : ', values)
    }
    return (
        <MainLayout breadcrumbItems={Breadcrumbs.Users.INDEX}>
            <PageHeader title='User List' topActions={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Link href='users/create'><Button size='large' type='primary'>New User</Button></Link>
            ]} />
            <FilterSection searchHandler={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={
                    [
                        <MultiFilterDropdown form={form} title='Filter' initialValues={{ status: '' }} onFinish={handleFinish} onReset={() => console.log('Hello')} fieldsForm={[
                            <Form.Item
                                label={<Space size="small"><Typography.Text>Status</Typography.Text> <QuestionCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} /><Typography.Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>(optional)</Typography.Text></Space>}
                                name="status"
                                rules={[{ required: true }]}
                            >
                                <Select options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} onChange={handleStatus} allowClear style={{ width: '100%' }} />
                            </Form.Item>,
                            <Form.Item label="Status" name="status">
                                <Select options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} onChange={handleStatus} allowClear style={{ width: '100%' }} />
                            </Form.Item>,
                            <Form.Item label="Status" name="status">
                                <Select options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} onChange={handleStatus} allowClear style={{ width: '100%' }} />
                            </Form.Item>

                        ]}
                        />,

                        <DateRangePicker range={10} onChange={handleRange} />,
                        <DatePicker onChange={handleDate} />
                    ]
                } />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                perPage={props.meta.perPage}
                onPageChange={(page) => setQueryParams({ page: page.toString() })}
            />
        </MainLayout>
    );
};

export default UsersPage;
