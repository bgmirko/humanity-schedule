import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './PageNavigation.css';

const PageNavigation = ( props ) => (
    <header className={classes.PageNavigation}>
        <nav>
            <ul>
                <li><NavLink to="/" exact activeClassName={classes.Active}>Home</NavLink></li>
                <li><NavLink to="/filter" activeClassName={classes.Active}>Filter</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default PageNavigation;