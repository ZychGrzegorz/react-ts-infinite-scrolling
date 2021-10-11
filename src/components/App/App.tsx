import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { QueryContext } from '../../context/QueryContext';
import { Navbar } from '../Navbar'
import { Search } from '../Search'
import { Home } from '../Home'



import './App.scss';


export const App = () => {

    const [query, setQuery] = useState<string>('')
    return (
        <Router>
            <QueryContext.Provider value={{ query, setQuery }}>

                <Navbar />
                <Switch>
                    <Route exact path={'/'} children={<Home />} />

                    <Route path={'/search'} children={<Search />} />

                    {/* <Route path="/:id" children={} /> */}
                    {/* <div className="App"> */}
                    <header className="App-header">
                        <p>hello world!</p>

                    </header>
                    {/* </div> */}
                </Switch>
            </QueryContext.Provider>
        </Router>
    );
}

