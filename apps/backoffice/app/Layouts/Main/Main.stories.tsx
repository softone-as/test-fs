import React from 'react';
import { Main as MainComponent } from "./AuthenticatedLayout"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Layout/Authenticated',
    component: MainComponent,
} as ComponentMeta<typeof MainComponent>


export const Template: ComponentStory<typeof MainComponent> = (args) => <MainComponent {...args}>{args.children}</MainComponent>

export const example: ComponentStory<typeof MainComponent> = Template.bind({})
example.args = {
    breadcrumbs: [{ label: 'Dashboard', href: '/dashboard' }],
    title: 'Hello Boilerplate',
    children: <div>Hello</div>
}


