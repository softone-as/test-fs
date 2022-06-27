import React, { useState } from 'react';
import { Circle } from 'rc-progress';
import {
    ImagePreviewContainer,
    ImagePreviewItem,
} from './ImagePreview.atom.styled';

type ImagePreviewProps = {
    image: string;
    progress?: number;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, progress }) => {
    return (
        <ImagePreviewContainer>
            {progress > 0 && progress < 100 && (
                <Circle
                    percent={progress}
                    strokeWidth={4}
                    strokeColor="#01803c"
                    className="loading__progress"
                />
            )}

            <ImagePreviewItem
                id="imagePreview"
                backgroundImage={`url(${image})`}
            />
        </ImagePreviewContainer>
    );
};

export default ImagePreview;
