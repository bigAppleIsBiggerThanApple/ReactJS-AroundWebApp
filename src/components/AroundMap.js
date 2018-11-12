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
        const radius = this.getRadius();
        this.props.loadNearbyPosts(center, radius);
    }
    getCenter = () => {
        const center = this.map.getCenter();
        return {lat: center.lat(), lon: center.lng()}
    }
    //根据图中心点到边的距离
    getRadius = () => {
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new window.google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * window.google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
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
                //zoom的时候也要change center
                onZoomChanged={this.reloadMarkers}
            >
                {this.props.posts.map((post)=> <AroundMarker post={post} key={post.url}/>)}
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));