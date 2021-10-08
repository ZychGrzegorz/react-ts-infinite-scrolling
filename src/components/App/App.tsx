import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



import { Navbar } from '../Navbar'




import './App.scss';

export const App = ()=> {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* <div className="App"> */}
                <header className="App-header">
                    <p>hello world!</p>

                </header>
                {/* </div> */}
            </Switch>
        </Router>
    );
}

