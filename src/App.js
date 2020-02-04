import React from 'react';
import {Route, useRouteMatch} from "react-router-dom";

import NavBar from './components/Navbar';
import Home from "./components/Home";
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import {GET_COLOR_BACKGROUND} from './utils/Store'

const App = () => {
    const {data, client} = useQuery(GET_COLOR_BACKGROUND);
    return (
        <div className={data.colorBackground}>
            <NavBar/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/quizzes" component={QuizList}/>
            <Route exact path="/quizzes/:quizId" component={Quiz}/>
        </div>
    );
}

export default App;

