import React from 'react';
import { Dashboard } from "./Dashboard"
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Filters, } from '../../Components/molecules/Filters';
import { TFilter } from '../../Components/molecules/Filters/Entities'

export default {
    title: 'Layout/Dashboard',
    component: Dashboard,
} as ComponentMeta<typeof Dashboard>


export const Template: ComponentStory<typeof Dashboard> = (args) => <Dashboard {...args}>{args.children}</Dashboard>

export const BasicDashboard: ComponentStory<typeof Dashboard> = Template.bind({})
BasicDashboard.args = {
    title: 'Hello Boilerplate',
    children: <div>Hello</div>
}

const filters: TFilter[] = [
    {
        type: 'dropdown',
        dropDownFilter: {
            title: 'Status',
            itemsMenu: [
                {
                    key: '1',
                    label: 'Done',
                    onClick: (val) => alert(`Value : ${val.key}`)
                }
            ]
        }
    },
    {
        type: 'dateRange',
        dateRangePickerFilter: {
            range: 10,
            onChange: val => alert(`Value ${val?.toString()}`)
        }
    },
    {
        type: 'datePicker',
        datePickerFilter: {
            onChange: val => alert(`DATE PICK : ${val?.toString()}`)
        }
    }
]


export const DashboardWithFilters: ComponentStory<typeof Dashboard> = Template.bind({})
DashboardWithFilters.args = {
    title: 'Hello Boilerplate Dashboard with filter',
    children: <Filters filters={filters} handleSearch={(data) => console.log(data)} />
}


