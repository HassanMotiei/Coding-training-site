import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'

import {AiOutlineHome} from 'react-icons/ai';
import {MdLocalGroceryStore} from 'react-icons/md';
import {BiCommentDetail} from 'react-icons/bi';
import {FiUsers} from 'react-icons/fi';
import {BsBagCheck} from 'react-icons/bs';
import {MdOutlineDiscount} from 'react-icons/md';

export default function Sidebar() {
    return (
        <div className="sidebar">

            <p className="sidebar-title">Your Dashboard</p>

            <ul className="sidebar-links">

                <Link to="/">
                    <li className="active">
                        <AiOutlineHome className="icon"/>
                        Main Page
                    </li>
                </Link>

                <Link to="/products">
                    <li>
                        <MdLocalGroceryStore className="icon"/>
                        Products
                    </li>
                </Link>

                <Link to="/comments">
                    <li>
                        <BiCommentDetail className="icon"/>
                        Comments
                    </li>
                </Link>

                <Link to="/users">
                    <li>
                        <FiUsers className="icon"/>
                        Users
                    </li>
                </Link>

                <Link to="/orders">
                    <li>
                        <BsBagCheck className="icon"/>
                        Orders
                    </li>
                </Link>

                <Link to="/discounts">
                    <li>
                        <MdOutlineDiscount className="icon"/>
                        Discounts
                    </li>
                </Link>

            </ul>

        </div>
    )
}
