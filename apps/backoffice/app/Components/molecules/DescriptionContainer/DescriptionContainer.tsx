import { Descriptions, DescriptionsProps, Grid } from 'antd';
import React from 'react';

const DescriptionContainer = ({
    size = 'small',
    layout = 'horizontal',
    ...props
}: DescriptionsProps) => {
    const { md } = Grid.useBreakpoint();

    return (
        <Descriptions
            size={size}
            layout={layout}
            labelStyle={{
                ...props.labelStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && '15%'
                        : null,
            }}
            contentStyle={{
                ...props.labelStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && '15%'
                        : null,
            }}
            column={
                props.column ? props.column : { lg: 2, md: 2, sm: 1, xs: 1 }
            }
            {...props}
        >
            {props.children}
        </Descriptions>
    );
};

export default DescriptionContainer;
