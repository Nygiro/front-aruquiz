import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_COLOR_BACKGROUND} from './../utils/Store'
import HeaderInformation from './helpers/HeaderInformation'
import Search from './helpers/Search'
const Home = () => {
    const colorBackground = 'blue-background';
    const {client} = useQuery(GET_COLOR_BACKGROUND);
    client.writeData({data: {colorBackground}});

    return (
        <>
            <HeaderInformation title="Aruquiz is a learning tool for students.">
                Discover learning with many qcm through augmented reality.
                Aruquiz allows you to create single or multiple choice questionnaires using a webcam or
                smartphone photo
                camera.
            </HeaderInformation>
        </>
    )
}

export default Home;