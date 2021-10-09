import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



import { Navbar } from '../Navbar'
import { Search } from '../Search'
import { Home } from '../Home'



import './App.scss';

export const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path={'/'} children={ <Home />}/>
                   
                <Route  path={'/search'} children={<Search />}/>
                    
                {/* <Route path="/:id" children={} /> */}
                {/* <div className="App"> */}
                <header className="App-header">
                    <p>hello world!</p>

                </header>
                {/* </div> */}
            </Switch>
        </Router>
    );
}

