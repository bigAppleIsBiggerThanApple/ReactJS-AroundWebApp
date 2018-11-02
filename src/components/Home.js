import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from "../constants"
import {Spin} from 'antd';
import {POS_KEY} from "../constants"
import {API_ROOT} from "../constants"
import {AUTH_HEADER} from "../constants"
import {TOKEN_KEY} from "../constants"

const TabPane = Tabs.TabPane;

export class Home extends React.Component{
    state = {
        isLoadingGeoLocation: false,
        error: '',
        isLoadingPosts: false,
        posts: [],
    }
    componentDidMount(){
        if ("geolocation" in navigator) {
            this.setState({isLoadingGeoLocation: true, error:'',});
            navigator.geolocation.getCurrentPosition(
            this.onSuccessLoadGeoLocation,
            this.onFailedLoadGeoLocation,
                GEO_OPTIONS);
        } else {
            this.setState({error:'Geolocation is not supported'})
            /* geolocation IS NOT available */
        }
    }
    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY,JSON.stringify({lat: latitude, lon: longitude}));
        this.setState({isLoadingGeoLocation: false});
        this.loadNearbyPost();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({isLoadingGeoLocation: false, error:'Geolocation is not supported'});
    }

    loadNearbyPost = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({ isLoadingPosts: true, error: ''})
        fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts.');
        }).then((data) => {
            console.log(data);
            this.setState({ isLoadingPosts: false, posts: data? data : []})
        }).catch((e) => {
            console.log(e.message);
            this.setState({ isLoadingPosts: false})
        });
    }
    getImagePosts = () => {
        const {error, isLoadingGeoLocation, isLoadingPosts} = this.state;
        if (error){
            return <div>{error}</div>
        }else if (isLoadingGeoLocation){
            return <Spin tip='Loading geo location...'/>
        }else if (isLoadingPosts){
            return <Spin tip='Loading posts...'/>
        }
        else{
            return 'Content of tab 1'
        }
    }
    render(){
        const operations = <Button type="primary"> Create New Post </Button>
        return(
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {/*什么时候加（），什么时候不加？*/}
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Video Posts" key="2">Content of tab 2</TabPane>
                <TabPane tab="Map" key="3">Content of tab 3</TabPane>
            </Tabs>
        )
    }
}
