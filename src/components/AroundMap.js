import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";


class NormalAroundMap extends React.Component{
    state={
        isOpen:false
    }

    toggleOpen=() =>{
        this.setState((prevState) => {
            return{
                isOpen: !prevState.isOpen
            }
        })
    }

    render(){
        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                    onMouseOver={this.toggleOpen}
                    onMouseOut={this.toggleOpen}
                >
                    {this.state.isOpen ? <InfoWindow>
                        <div>content</div>
                    </InfoWindow> : null}

                </Marker>
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));