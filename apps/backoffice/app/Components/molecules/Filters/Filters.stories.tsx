import React from 'react';
import { Filters } from "./Filters"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Components/Molecules/Filters',
    component: Filters,
    argTypes: {
        filters: {
            description: 'List Of Filters'
        }
    },
    parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof Filters>


export const Template: ComponentStory<typeof Filters> = (args) => <Filters {...args} />

export const BasicFilter: ComponentStory<typeof Filters> = Template.bind({})
BasicFilter.args = {
    filters: [
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
            type: 'datePicker',
            datePickerFilter: {
                onChange: (date, dateString) => alert(`Value: ${dateString}`)
            }
        }
    ]
}




