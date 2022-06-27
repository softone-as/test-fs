import React, { useState } from 'react';

import { OverlayBoxContainer } from './OverlayBox.atom.styled';

type OverlayBoxProps = {
    isShow: boolean;
    handleClose: () => void;
};

const OverlayBox: React.FC<OverlayBoxProps> = ({ isShow, handleClose }) => {
    return <OverlayBoxContainer show={isShow} onClick={handleClose} />;
};

export default OverlayBox;
