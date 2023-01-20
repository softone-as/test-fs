import React from 'react';
import { Dashboard } from "./Dashboard"
import { ComponentMeta, ComponentStory } from '@storybook/react'
// import { Filters, } from '../../Components/molecules/Dropdowns';
// import { TFilter } from '../../Components/molecules/Dropdowns/Entities'

export default {
    title: 'Layout/Dashboard',
    component: Dashboard,
} as ComponentMeta<typeof Dashboard>


export const Template: ComponentStory<typeof Dashboard> = (args) => <Dashboard {...args}>{args.children}</Dashboard>


