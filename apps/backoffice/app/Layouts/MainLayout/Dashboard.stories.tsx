import React from 'react';
import { MainLayout } from "./MainLayout"
import { ComponentMeta, ComponentStory } from '@storybook/react'
// import { Filters, } from '../../Components/molecules/Dropdowns';
// import { TFilter } from '../../Components/molecules/Dropdowns/Entities'

export default {
    title: 'Layout/MainLayout',
    component: MainLayout,
} as ComponentMeta<typeof MainLayout>


export const Template: ComponentStory<typeof MainLayout> = (args) => <MainLayout {...args}>{args.children}</MainLayout>


