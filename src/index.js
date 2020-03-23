import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './css/Variable.scss';
import { ARUQUIZ_USER_IS_LOGGED_IN, ARUQUIZ_USER_USERNAME, ARUQUIZ_USER_TOKEN, ARUQUIZ_CURRENT_SCHOOL_CLASS } from './utils/Constants';

const client = new ApolloClient({
    uri: process.env.REACT_APP_PRISMA_API_ENDPOINT,
    request: (operation) => {
        const token = localStorage.getItem(ARUQUIZ_USER_TOKEN)
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
})

console.log('clear')
// SHARE PROPS
client.writeData({
    data: {
        darkMode: true,
        isLoggedIn: localStorage.getItem(ARUQUIZ_USER_IS_LOGGED_IN),
        userName: localStorage.getItem(ARUQUIZ_USER_USERNAME),
        userToken: localStorage.getItem(ARUQUIZ_USER_TOKEN),
        currentSchoolClassesForQuiz: null, 
        currentListStudentsForQuiz: null, 
    }
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
