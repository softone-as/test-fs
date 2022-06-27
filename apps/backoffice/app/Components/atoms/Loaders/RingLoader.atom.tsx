import React, { useState } from 'react';
import { LoaderSizeProps } from 'react-spinners/interfaces';
import PulseLoader from 'react-spinners/PulseLoader';

type RingLoaderProps = LoaderSizeProps & {
    isLoading: boolean;
};

const RingLoader: React.FC<RingLoaderProps> = ({ isLoading, ...rest }) => {
    return (
        <PulseLoader color="white" loading={isLoading} size={10} {...rest} />
    );
};

export default RingLoader;
