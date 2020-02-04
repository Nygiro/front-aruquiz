import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter} from "react-router-dom";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.scss';

console.log(process.env.REACT_APP_PRISMA_API_ENDPOINT)
const client = new ApolloClient({
    uri: process.env.REACT_APP_PRISMA_API_ENDPOINT,
})


// SHARE PROPS
client.writeData({
    data: {
        colorBackground: '',
    }
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
