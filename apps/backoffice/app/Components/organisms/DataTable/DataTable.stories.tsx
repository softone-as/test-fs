import React from 'react';
import DataTable from "./DataTable"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Components/Organisms/DataTable',
    component: DataTable,
} as ComponentMeta<typeof DataTable>


export const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

export const example: ComponentStory<typeof DataTable> = Template.bind({})
example.args = {
    columns: columns,
    dataSource: dataSource
}



