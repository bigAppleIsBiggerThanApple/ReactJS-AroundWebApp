import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import {AroundMarker} from "./AroundMarker"
import {POS_KEY} from "../constants"


class NormalAroundMap extends React.Component{

    reloadMarkers= () => {
        const center = this.getCenter();
        this.props.loadNearbyPosts(center);
    }
    getCenter = () => {
        const center = this.map.getCenter();
        return {lat: center.lat(), lon: center.lng()}
    }
    getMapRef = (mapInstance) =>{
        this.map = mapInstance
    }

    render(){
        const {lat, lon : lng} = JSON.parse(localStorage.getItem(POS_KEY));
        return(
            <GoogleMap
                ref={this.getMapRef}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lng }}
                //drag的时候要变化中心位置，重新load marker

                onDragEnd={this.reloadMarkers}
                //在dragEnd的时候要loadNearbyPosts，并且要把中心改变。

            >
                {this.props.posts.map((post)=> <AroundMarker post={post} key={post.url}/>)}
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));