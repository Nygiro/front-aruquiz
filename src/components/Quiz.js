import React, {useState, useEffect} from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import {useQuery} from "@apollo/react-hooks";

import {GET_COLOR_BACKGROUND} from './../utils/Store'
import {GET_QUIZ} from './../utils/QuizApi'

import HeaderInformation from './helpers/HeaderInformation'
import CameraDetector from "./helpers/CameraDetector";
import Spinner from "./helpers/Spinner";


const Quiz = () => {
    const colorBackground = 'green-background';
    const {client} = useQuery(GET_COLOR_BACKGROUND);
    client.writeData({data: {colorBackground}});

    const {quizId} = useParams();
    const {loading, error, data} = useQuery(GET_QUIZ, {
        variables: {quizId},
    });


    const [openCamera, setOpenCamera] = useState(false);
    useEffect(() => {
        setOpenCamera(false);
    }, []);


    if (loading) return <Spinner/>;
    if (error) return `Error! ${error.message}`;

    const quizTemplate = (
        <HeaderInformation title={data.quiz.name}/>
    );

    let btnCameraText = openCamera ? 'Close' : 'Open';
    const btnCamera = (
        <div className="text-center">
            <button className="btn btn-success"
                    onClick={() => setOpenCamera(!openCamera)}>{btnCameraText} camera
            </button>
        </div>
    );

    return (
        <>
            {quizTemplate}
            <div>
                hello
            </div>
        </>
    )
}

export default Quiz