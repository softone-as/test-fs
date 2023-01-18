import React from 'react';
import ForbiddenError from "./ForbiddenError"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Pages/ForbiddenError',
    component: ForbiddenError,
} as ComponentMeta<typeof ForbiddenError>


export const Template: ComponentStory<typeof ForbiddenError> = () => <ForbiddenError />

export const example: ComponentStory<typeof ForbiddenError> = Template.bind({})



