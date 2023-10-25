import React from 'react'
import './App.css'
import {useRoutes} from "react-router-dom";

import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";

import routes from './routes';

export default function App() {

    let router = useRoutes(routes);

    return (
        <>
            <Sidebar/>

            <div className="main">
                <Header/>
                {router}
            </div>
        </>
    )
}
