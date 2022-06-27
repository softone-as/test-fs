import React, { useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    return { isLoading, setIsLoading };
};

export default useLoading;
