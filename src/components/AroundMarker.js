import React from 'react';
import {InfoWindow, Marker} from "react-google-maps"

export class AroundMarker extends React.Component{

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
        const {lat, lng} = this.props.position;
        return(
            <Marker
                position={{ lat: lat, lng: lng }}
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
            >
                {this.state.isOpen ? <InfoWindow>
                    <div>content</div>
                </InfoWindow> : null}

            </Marker>
        )
    }
}