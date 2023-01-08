import React from 'react';
import { Link as LinkComponent } from "./Link.atom"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Components/Atoms/Link',
    component: LinkComponent
} as ComponentMeta<typeof LinkComponent>

export const Link: ComponentStory<typeof LinkComponent> = ({ children, ...args }) => <LinkComponent {...args}>{children}</LinkComponent>

