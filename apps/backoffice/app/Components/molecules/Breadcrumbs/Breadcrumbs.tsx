import { Link } from '@inertiajs/inertia-react';
import { Breadcrumb } from 'antd';
import React from 'react';
import { TBreadcrumbsItem } from '../../../Modules/Common/Entities';

type PropsBreadcrumb = {
    breadcrumbs: TBreadcrumbsItem[];
};

const Breadcrumbs = ({ breadcrumbs }: PropsBreadcrumb) => {
    return (
        <Breadcrumb style={{ marginBottom: '8px' }}>
            {breadcrumbs?.map(({ label, path }, index) => {
                const isLast = breadcrumbs.length === index + 1;
                return isLast ? (
                    <Breadcrumb.Item key={label}>
                        <span
                            style={{
                                color: 'rgba(0, 0, 0, 0.88)',
                            }}
                        >
                            {label}
                        </span>
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={label}>
                        <Link href={path}>{label}</Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
