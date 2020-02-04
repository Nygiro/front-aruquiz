import React from 'react';
import {Link} from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {gql} from 'apollo-boost';
const Navbar = () => {

    return (
        <nav className='container-fluid'>
            <ul className="menu">
                <li className="logo">
                    <Link to="/">
                        <img src="https://s3.amazonaws.com/creativetim_bucket/new_logo.png" alt=""/>
                        <span>Aruquiz</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/quizzes">
                        Quizzes
                    </Link>
                </li>
                <li className="item"><a href="#">Classes</a></li>
                <li className="item"><a href="#">Blog</a></li>
                <li className="item"><a href="#">Reports</a></li>
                <li className="item"><a href="#">Contact</a>
                </li>
                <li className="item button"><a href="#">Sign in/Sign up</a></li>
                <li className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li>
            </ul>
        </nav>
    )
}

export default Navbar;