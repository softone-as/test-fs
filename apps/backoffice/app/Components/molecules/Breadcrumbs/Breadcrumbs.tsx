
import { Link } from '@inertiajs/inertia-react'
import { Breadcrumb, Typography } from 'antd'
import { BreadcrumbsItem } from '../../../Modules/Common/Entities'
import React from 'react'

type PropsBreadcrumb = {
    breadcrumb?: BreadcrumbsItem[]
}

const Breadcrumbs = ({ breadcrumb }: PropsBreadcrumb) => {
    return (
        <Breadcrumb style={{ marginBottom: 8 }}>
            {breadcrumb?.map((data, index) => (
                <Breadcrumb.Item key={index}>
                    {breadcrumb.length === 1 + index ? (
                        <Typography.Text>{data.label}</Typography.Text>
                    ) : (
                        <Link href={data.path}>{data.label}</Link>
                    )}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}

export default Breadcrumbs
