import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import {AroundMarker} from "./AroundMarker"
import {POS_KEY} from "../constants"


class NormalAroundMap extends React.Component{


    render(){
        const {lat, lon : lng} = JSON.parse(localStorage.getItem(POS_KEY));
        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                {this.props.posts.map((post)=> <AroundMarker post={post} key={post.url}/>)}
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));