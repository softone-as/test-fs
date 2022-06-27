import React, { useState } from 'react';

type ImageTableProps = {
    picture: string;
    alt: string;
};

const ImageTable: React.FC<ImageTableProps> = ({ picture, alt }) => {
    return (
        <div className="products__preview">
            <img className="products__pic" src={picture} alt={alt} />
        </div>
    );
};

export default ImageTable;
