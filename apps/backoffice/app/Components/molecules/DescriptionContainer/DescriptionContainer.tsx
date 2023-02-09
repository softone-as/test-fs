import { Descriptions, DescriptionsProps, Grid } from 'antd';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
function DescriptionContainer({ size = 'small', ...props }: DescriptionsProps) {
    const { md } = Grid.useBreakpoint();
    return (
        <Descriptions
            size={size}
            labelStyle={
                props.layout == 'horizontal' && {
                    ...props.labelStyle,
                    width: md && '15%',
                }
            }
            contentStyle={
                props.layout == 'horizontal' && {
                    ...props.contentStyle,
                    width: md && '30%',
                }
            }
            column={
                props.column ? props.column : { lg: 2, md: 2, sm: 1, xs: 1 }
            }
            {...props}
        >
            {props.children}
        </Descriptions>
    );
}

export default DescriptionContainer;
