import React, { useState } from 'react';

import { EmptyTextTitle } from './EmptyText.atom.styled';

type EmptyTextProps = {
    children?: React.ReactNode;
};

const EmptyText: React.FC<EmptyTextProps> = ({ children }) => {
    return (
        <EmptyTextTitle>{children || 'Data tidak ditemukan'}</EmptyTextTitle>
    );
};

export default EmptyText;
