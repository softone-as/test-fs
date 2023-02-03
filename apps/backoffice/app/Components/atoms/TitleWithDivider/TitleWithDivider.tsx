import { Divider, Typography } from 'antd'
// import { TypographyProps } from 'antd/es/typography/Typography'
import React from 'react'

interface IPropsTitleWithDivider {
    title: string
}

const TitleWithDivider = ({ title }: IPropsTitleWithDivider) => {
    return (
        <div style={{ margin: '16px 0 8px 0' }}>
            <Typography.Text strong>
                {title}
            </Typography.Text>
            <Divider style={{ margin: '16px 0 0 -24px', width: 'calc(100% + 48px)' }} />
        </div>
    )
}

export default TitleWithDivider