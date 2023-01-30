import React from 'react';
// import { Helmet } from 'react-helmet';
import { Head as InertiaHeader } from '@inertiajs/inertia-react'

type HeadProps = {
    title: string;
};

export const Head: React.FC<HeadProps> = ({ title }) => {
    return (
        <InertiaHeader title={title} />
    );
};

