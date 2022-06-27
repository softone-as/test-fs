import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { InputLabel, InputWrapperContainer } from '../../atoms/Inputs/InputWrapper.atom.styled';
import Marker from '../../atoms/Locations/Marker.atom';

type ControlledMapInputProps = {
    title: string;
    markerName: string;
    disabled?: boolean;
    hidden?: boolean;
    longitude: number;
    latitude: number;
    initLongitude: number;
    initLatitude: number;
    onDrag(map: any): void;
    onDragEnd(map: any): void;
};

const ControlledMapInput: React.FC<ControlledMapInputProps> = ({
    title,
    disabled = false,
    latitude = -7.983908,
    longitude = 112.621391,
    initLatitude = -7.983908,
    initLongitude = 112.621391,
    markerName,
    onDrag,
    onDragEnd,
    hidden = false
}) => {
    return (
        <InputWrapperContainer>
            <InputLabel>{title}</InputLabel>
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API }}
                    defaultCenter={{
                        lat: initLatitude,
                        lng: initLongitude,
                    }}
                    defaultZoom={14}
                    onDrag={onDrag}
                    onDragEnd={onDragEnd}
                >
                    <Marker
                        lat={latitude}
                        lng={longitude}
                        text={markerName || "Base"}
                    />
                </GoogleMapReact>
            </div>
        </InputWrapperContainer>
    )
};

export default ControlledMapInput;
