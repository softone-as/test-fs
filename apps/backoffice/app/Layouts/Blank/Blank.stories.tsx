import React from 'react';
import { Blank as BlankComponent } from "./Blank"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Layout/Blank',
    component: BlankComponent
} as ComponentMeta<typeof BlankComponent>

export const Blank: ComponentStory<typeof BlankComponent> = (args) => <BlankComponent title={args.title} >{args.children}</BlankComponent>

