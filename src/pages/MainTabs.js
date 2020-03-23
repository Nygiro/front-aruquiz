import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route } from 'react-router';
import { calendar, create, map, informationCircle } from 'ionicons/icons';
import Quizzes from './Quizzes';
import RedirectLogout from '../components/Utils/RedirectLogout';
import SchoolClasses from './SchoolClasses';
import Quiz from './Quiz';
import NewQuiz from './NewQuiz';


const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/quizzes" component={Quizzes} exact />
        <Route path="/schoolClasses" component={SchoolClasses} exact />
        <Route path="/logout" component={RedirectLogout} exact />
        <Route path="/quizzes/new" component={NewQuiz} exact />
        <Route path="/quizzes/:quizId" component={Quiz} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="quizzes" href="/quizzes">
          <IonIcon icon={calendar} />
          <IonLabel>Quizzes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={map} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/quizzes/new">
          <IonIcon icon={create} />
          <IonLabel>New Quiz</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;