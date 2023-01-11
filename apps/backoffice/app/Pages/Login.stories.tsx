import React from 'react';
import Login from "./Login"
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
    title: 'Pages/Login',
    component: Login,

} as ComponentMeta<typeof Login>

export const LoginPage: ComponentStory<typeof Login> = () => <Login />

