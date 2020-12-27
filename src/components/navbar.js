import React from 'react'
import '../scss/navbar.scss'

import Home from "../pages/Home";
import Listitems from '../pages/Listitems'
import PagesaddItem from '../pages/PagesaddItem'
import PagesEditingItem from "../pages/PagesEditingItem";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";

function Navbar ({handleLogout}){
    return(
        <Router>

            <ul>

                <li><Link to="/">Home</Link></li>
                <li><Link to="/Listitems">Список товаров</Link></li>
                <li><Link to="/PagesaddItem">Добавление нового товара</Link></li>
                <li><Link to="/PagesEditingItem">Редактирование товара</Link></li>
                <button onClick={handleLogout} className={'logout'}>Выйти из аккаунта</button>
            </ul>
            <Switch>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/Listitems" component={Listitems}/>
                <Route exact path="/PagesaddItem" component={PagesaddItem}/>
                <Route exact path="/PagesEditingItem" component={PagesEditingItem}/>
                <Redirect from='/' to='/home'/>
            </Switch>

        </Router>

    )

}

export  default Navbar