import React, { useState } from 'react';
import CheckBox from '../../atoms/Inputs/CheckBox.atom';

type IndeterminateCheckboxProps = {
    indeterminate?: boolean;
    title?: string;
};

const IndeterminateCheckbox = React.forwardRef<
    HTMLInputElement,
    IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        (resolvedRef as React.MutableRefObject<any>).current.indeterminate =
            indeterminate;
    }, [resolvedRef, indeterminate]);

    return <CheckBox ref={resolvedRef} {...rest} />;
});

export default IndeterminateCheckbox;
