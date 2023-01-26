import React from 'react'
import { InertiaLink, InertiaLinkProps } from '@inertiajs/inertia-react'

export const Link: React.FC<InertiaLinkProps> = ({ children, ...args }: InertiaLinkProps) => {
    return window.location.host !== process.env.STORY_HOST ? <InertiaLink {...args}>{children}</InertiaLink> : <a href={args.href}>{children}</a>
}