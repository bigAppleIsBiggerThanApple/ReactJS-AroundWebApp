import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import {AroundMarker} from "./AroundMarker"


class NormalAroundMap extends React.Component{


    render(){
        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <AroundMarker position={{lat : -34.397, lng: 150.644}}/>
                <AroundMarker position={{lat : -34.200, lng: 150.644}}/>
                <AroundMarker position={{lat : -34.397, lng: 150.700}}/>
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));