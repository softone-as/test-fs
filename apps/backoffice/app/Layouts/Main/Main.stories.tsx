import React from 'react';
import { Main as MainComponent } from "./Layout"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Layout/Main',
    component: MainComponent
} as ComponentMeta<typeof MainComponent>


export const Main: ComponentStory<typeof MainComponent> = ({ children, ...args }) => <MainComponent {...args} >{children}</MainComponent>

