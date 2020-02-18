import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { IonRouterOutlet, IonSplitPane } from '@ionic/react';

import MainTabs from './MainTabs';
import { IonReactRouter } from '@ionic/react-router';

import { GET_IS_LOGGED_IN, GET_IS_DARK_MODE } from './../utils/Store';

import Signup from './Signup';
import Signin from './Signin';
import Menu from './../components/Menu';
import { useQuery } from '@apollo/react-hooks';
import Homescreen from '../components/Homescreen';
import Quiz from './Quiz';

const Home = () => {
  const { data: dataForIsLoggedIn } = useQuery(GET_IS_LOGGED_IN);
  const menuTemplate = (dataForIsLoggedIn.isLoggedIn) ? (
    <>
      <IonSplitPane contentId="main">
        <Menu isLoggedIn={true} />
        <IonRouterOutlet id="main">
          <Route path="/" component={MainTabs}/>
          <Route path="/quizzes/:quizId" component={Quiz} />
        </IonRouterOutlet>
      </IonSplitPane>
    </>
  ) :
    (
      <>
        <Menu isLoggedIn={false} />
        <IonRouterOutlet id="main">
          <Route path="/" component={Homescreen} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />
        </IonRouterOutlet>
      </>
    );

  return (
    <IonReactRouter>
      {menuTemplate}
    </IonReactRouter>
  );
}

export default Home;