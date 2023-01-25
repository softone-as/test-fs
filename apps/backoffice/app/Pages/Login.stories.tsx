import React from 'react';
import Login from "./Login"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Pages/Login',
    component: Login,
} as ComponentMeta<typeof Login>


export const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />

export const example: ComponentStory<typeof Login> = Template.bind({})
