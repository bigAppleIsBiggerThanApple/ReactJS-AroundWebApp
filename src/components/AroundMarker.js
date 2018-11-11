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
        const{user, message, url, location} = this.props.post;
        const {lat, lon : lng} = location;
        return(
            <Marker
                position={{ lat: lat, lng: lng }}
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
            >
                {this.state.isOpen ? <InfoWindow>
                    <div>
                        <img src={url} alt={message} className="around-marker-image"/>
                        <p>{`${user}: ${message}`}</p>
                    </div>
                </InfoWindow> : null}

            </Marker>
        )
    }
}