module.exports = {
    stories: [
        '../apps/backoffice/app/**/*.stories.mdx',
        '../apps/backoffice/app/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
};
