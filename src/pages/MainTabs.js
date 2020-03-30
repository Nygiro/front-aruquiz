import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route } from 'react-router';
import { list, create, map, stats } from 'ionicons/icons';
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
        <Route path="/new" component={NewQuiz} exact />
        <Route path="/quizzes/:quizId" component={Quiz} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="quizzes" href="/quizzes">
          <IonIcon icon={list}/>
          <IonLabel>Quiz</IonLabel>
        </IonTabButton>
        <IonTabButton tab="schoolClasses" href="/schoolClasses">
          <IonIcon icon={map} />
          <IonLabel>Vos classes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="report" href="/report">
          <IonIcon icon={stats} />
          <IonLabel>Rapport</IonLabel>
        </IonTabButton>
        <IonTabButton tab="new" href="/new">
          <IonIcon icon={create} />
          <IonLabel>Créer</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;