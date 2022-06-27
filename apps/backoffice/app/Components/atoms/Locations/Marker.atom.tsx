import React, { useState } from 'react';
import { FaRecycle, FaWarehouse } from 'react-icons/fa';
import { PlaceTyle } from './Marker.atom.styled'

type MarkerProps = {
    lat: number,
    lng: number,
    text: string
};

const Marker: React.FC<MarkerProps> = ({
    lat,
    lng,
    text,
}) => {
    return (
        <PlaceTyle>
            <FaWarehouse />
            {text}
        </PlaceTyle>
    );
}

export default Marker;
