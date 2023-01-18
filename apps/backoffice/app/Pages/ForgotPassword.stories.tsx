import React from 'react';
import ForgotPassword from "./ForgotPassword"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Pages/ForgotPassword',
    component: ForgotPassword,
} as ComponentMeta<typeof ForgotPassword>


export const Template: ComponentStory<typeof ForgotPassword> = (args) => <ForgotPassword {...args} />

export const example: ComponentStory<typeof ForgotPassword> = Template.bind({})



