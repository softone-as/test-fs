import React from 'react';
import { LoginLayout } from "./LoginLayout"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Layout/Login',
    component: LoginLayout,

} as ComponentMeta<typeof LoginLayout>

export const Template: ComponentStory<typeof LoginLayout> = (args) => <LoginLayout title={args.title} >{args.children}</LoginLayout>

export const Example: ComponentStory<typeof LoginLayout> = Template.bind({})
Example.args = {
    children: <h1>Hello</h1>
}

