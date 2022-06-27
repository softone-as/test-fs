import React from "react";

import {
    MapBoxContainer,
    MapBoxContent,
    MapBoxContentContainer,
    MapBoxTitle,
} from './MapBox.atom.styled';

type MapBoxProps = {
    title: string;
    isFull?: boolean;
    center: {
        lat: number,
        lng: number
    }

};

const MapBox: React.FC<MapBoxProps> = ({ title, isFull = false, center }) => {
    return (
        <MapBoxContainer className={`col-12 col-md-${isFull ? '12' : '6'}`}>
            <MapBoxTitle>{title}</MapBoxTitle>
            <MapBoxContentContainer>
                {center ?
                    <iframe
                        width="100%"
                        height="500px"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen={true}
                        referrerPolicy="no-referrer-when-downgrade"
                        scrolling="yes"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API}&zoom=14&q=${center.lat},${center.lng}`}>
                    </iframe>
                    : <> - </>}
            </MapBoxContentContainer>
        </MapBoxContainer >
    );
};

export default MapBox;