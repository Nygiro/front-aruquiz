import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import Spinner from "./helpers/Spinner";
import {GET_COLOR_BACKGROUND} from './../utils/Store'
import {GET_QUIZZES} from './../utils/QuizApi'
import HeaderInformation from "./helpers/HeaderInformation";

const QuizList = () => {
    const {loading, error, data} = useQuery(GET_QUIZZES);
    const {path} = useRouteMatch();

    const colorBackground = 'red-background';
    const {client} = useQuery(GET_COLOR_BACKGROUND);
    client.writeData({data: {colorBackground}})

    if (loading) return <Spinner/>;
    if (error) return `Error! ${error.message}`;

    const quizzesList = data.quizzes.map((quiz) => (
        <div className="col-12 col-sm-6 col-lg-4">
            <Link to={`${path}/${quiz.id}`}>
                <div className="card no-border">
                    <div className="container-img">
                        <img className="card-img-top"
                             src="https://s3.amazonaws.com/creativetim_bucket/products/51/thumb/opt_mdp_thumbnail.jpg?1521134752"
                             alt="Card image cap"/>
                        <div className="overlay-content">
                            <p>{quiz.name}</p>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="card-text-header">
                            <h5>{quiz.name}</h5>
                            <h5 className="card-text-category">{quiz.schoolSubject.name}</h5>
                        </div>
                        <p>Florian Frm</p>
                    </div>
                </div>
            </Link>
        </div>
    ));

    return (
        <>
            <HeaderInformation title="Discover quizz for your students.">
                Discover learning with many qcm through augmented reality.
                Aruquiz allows you to create single or multiple choice questionnaires using a webcam or
                smartphone photo
                camera.
            </HeaderInformation>
            <div className={`container`}>
                <ul className='category-list'>
                    <li>All quizzes</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                    <li>onglet 1</li>
                </ul>
            </div>

            <div className="white-template pt-category">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Categorie 1</h2>
                        </div>
                    </div>
                    <div className="row">
                        {quizzesList}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizList;