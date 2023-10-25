import React from 'react'
import './Header.css'

import {AiOutlineBell} from "react-icons/ai";
import {BsBrightnessHigh} from "react-icons/bs";

export default function Header() {
    return (

        <div className="header">

            <div className="admin-profile">

                <img src="./img/motiei.jpg" alt="Admin profile"/>

                <div>
                    <h5>Hassan Motiei</h5>
                    <h6>FrontEnd Developer</h6>
                </div>

            </div>

            <div className="header-left-section">

                <div className="search-box">
                    <input type="text" placeholder="Search..."/>
                    <button>Search</button>
                </div>

                <button className="header-left-icon">
                    <AiOutlineBell/>
                </button>

                <button className="header-left-icon">
                    <BsBrightnessHigh/>
                </button>

            </div>

        </div>
    )
}
