import { Descriptions, DescriptionsProps, Grid } from 'antd';
import { Breakpoint } from 'antd/es/_util/responsiveObserver';
import React from 'react';

const DescriptionContainer = ({
    size = 'small',
    layout = 'horizontal',
    column = { lg: 2, md: 2, sm: 1, xs: 1 },
    ...props
}: DescriptionsProps) => {
    const { sm, md, lg, xl, xs, xxl } = Grid?.useBreakpoint();

    const isColumnOne = (): string => {
        if (xxl && (column as Record<Breakpoint, number>).xxl == 1) {
            return '4%';
        }
        if (xl && (column as Record<Breakpoint, number>).xl == 1) {
            return '4%';
        }

        if (lg && (column as Record<Breakpoint, number>).lg == 1) {
            return '4%';
        }

        if (md && (column as Record<Breakpoint, number>).md == 1) {
            return '4%';
        }

        if (sm && (column as Record<Breakpoint, number>).sm == 1) {
            return '25%';
        }

        if (xs && (column as Record<Breakpoint, number>).xs == 1) {
            return '35%';
        }
    };

    return (
        <Descriptions
            size={size}
            layout={layout}
            labelStyle={{
                ...props.labelStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && (column as Record<Breakpoint, number>).md != 1
                            ? '15%'
                            : isColumnOne()
                        : null,
            }}
            contentStyle={{
                ...props.contentStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && '30%'
                        : null,
            }}
            column={column}
            {...props}
        >
            {props.children}
        </Descriptions>
    );
};

export default DescriptionContainer;
