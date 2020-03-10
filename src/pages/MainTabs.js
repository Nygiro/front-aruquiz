import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route } from 'react-router';
import { calendar, contacts, map, informationCircle } from 'ionicons/icons';
import Quizzes from './Quizzes';
import RedirectLogout from '../components/Utils/RedirectLogout';
import SchoolClasses from './SchoolClasses';


const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/quizzes" component={Quizzes} exact />
        <Route path="/schoolClasses" component={SchoolClasses} exact />
        <Route path="/logout" component={RedirectLogout} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="quizzes" href="/quizzes">
          <IonIcon icon={calendar} />
          <IonLabel>Quizzes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={contacts} />
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={map} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;