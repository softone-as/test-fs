import { Breadcrumb } from 'antd';
import React from 'react';
import { TBreadcrumbsItem } from '../../../Modules/Common/Entities';

type PropsBreadcrumb = {
    breadcrumbs: TBreadcrumbsItem[];
};

const Breadcrumbs = ({ breadcrumbs }: PropsBreadcrumb) => {
    return (
        <Breadcrumb style={{ marginBottom: '8px' }}>
            {breadcrumbs?.map(({ label, path }) => {
                return !path ? (
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
                        <a href={path}>{label}</a>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
