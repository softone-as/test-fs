import React, { useState } from 'react';
import ImagePreview from '../Images/ImagePreview.atom';
import {
    ImageBoxContainer,
    ImageBoxContentContainer,
    ImageBoxTitle,
} from './ImageBox.atom.styled';

type ImageBoxProps = {
    title: string;
    image: string;
};

const ImageBox: React.FC<ImageBoxProps> = ({ title, image }) => {
    return (
        <ImageBoxContainer className="col-12 col-md-6">
            <ImageBoxTitle>{title}</ImageBoxTitle>
            <ImagePreview
                image={image}
            />
        </ImageBoxContainer>
    );
};

export default ImageBox;
