import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxDropdown } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Dropdowns',
    component: CheckboxDropdown,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CheckboxDropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxDropdown> = (args) => (
    <CheckboxDropdown {...args} />
);

export const CheckboxDropdownMolecule = Template.bind({});

CheckboxDropdownMolecule.args = {
    label: 'Dropdown',
    options: [
        { label: 'Checkbox 1', value: 'checkbox 1' },
        { label: 'Checkbox 2', value: 'checkbox 2' },
    ],
    value: ['checkbox 1'],
};
