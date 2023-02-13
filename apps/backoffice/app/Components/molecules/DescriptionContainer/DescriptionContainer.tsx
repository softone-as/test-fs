import { Descriptions, DescriptionsProps, Grid } from 'antd';
import React from 'react';

interface IDescriptionContainer extends DescriptionsProps {
    withDefaultWidth?: boolean;
}

const DescriptionContainer = ({
    size = 'small',
    layout = 'horizontal',
    ...props
}: IDescriptionContainer) => {
    const { withDefaultWidth } = props;

    const { md } = Grid.useBreakpoint();
    return (
        <Descriptions
            size={size}
            layout={layout}
            labelStyle={
                withDefaultWidth
                    ? null
                    : layout == 'horizontal' && {
                          ...props.labelStyle,
                          width: md && '15%',
                      }
            }
            contentStyle={
                withDefaultWidth
                    ? null
                    : layout == 'horizontal' && {
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
};

export default DescriptionContainer;
