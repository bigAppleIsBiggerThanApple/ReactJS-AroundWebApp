import React from 'react';
import {Register} from "./Register";
import {login} from "./Login";
import { Switch, Route} from 'react-router-dom';


export class Main extends React.Component{
    render(){
        return(
            <div className="main">
                <Switch>
                        <Route exact path="/" component={login}/>
                        <Route path="/login" component={login}/>
                        <Route path="/register" component={Register}/>
                        <Route component={login}/>
                    </Switch>
            </div>
        )
    }
}
