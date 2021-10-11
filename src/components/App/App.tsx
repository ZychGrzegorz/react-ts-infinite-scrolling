import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryContext } from '../../context/QueryContext';
import { Navbar } from '../Navbar'
import { Search } from '../Search'
import { Home } from '../Home'
import { NoMatch } from '../NoMatch';

export const App = () => {
    const [query, setQuery] = useState<string>('')
    return (
        <Router>
            <QueryContext.Provider value={{ query, setQuery }}>
                <Navbar />
                <Switch>
                    <Route exact path={'/'} children={<Home />} />
                    <Route path={'/search'} children={<Search />} />
                    <Route path="*" children={ <NoMatch />}/>
                </Switch>
            </QueryContext.Provider>
        </Router>
    );
}

