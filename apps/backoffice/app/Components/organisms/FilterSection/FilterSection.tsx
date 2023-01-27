import React from 'react'
import { Col, Row, Input, MenuProps, Typography, Space, Dropdown } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

export interface IFilterSection {
    searchHandler: (search: string) => void,
    filters?: React.ReactNode[]
    selectedRows: React.Key[]
    batchActionMenus: MenuProps['items']
}

export const FilterSection = (props: IFilterSection) => {
    const searchHandler = debounce((e) => {
        e.preventDefault()
        props.searchHandler(e.target.value)
    }, 500)
    return (
        <Row gutter={[8, 0]} align='middle'>
            {/* Batch Action */}
            {
                props.selectedRows.length > 0 &&
                <Col>
                    <Space>
                        <Dropdown.Button menu={{ items: props.batchActionMenus }} >
                            Action
                        </Dropdown.Button>
                        <Typography.Text style={{ color: '#006D75' }}>{props.selectedRows.length} item selected</Typography.Text>
                    </Space>

                </Col>
            }

            {/* Filters */}
            {
                props.filters.map((item, index) => {
                    return (
                        <Col key={index}>
                            {item}
                        </Col>
                    )
                })
            }

            {/* Search */}
            <Col flex='auto'>
                <Input prefix={<SearchOutlined />} placeholder='Search' onChange={searchHandler} />
            </Col>
        </Row >
    )
}