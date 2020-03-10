import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonToggle
} from '@ionic/react';
import { list, contacts, hammer, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons';
import React, { useState } from 'react';
import { GET_IS_DARK_MODE, GET_IS_LOGGED_IN } from './../utils/Store';
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const routes = {
  connectedPages:
    [
      {
        titleList: 'Navigation',
        links: [
          { title: 'Quizzes', path: '/quizzes', icon: list },
          { title: 'School classes', path: '/schoolClasses', icon: contacts },
          { title: 'Map', path: '/map', icon: map },
          { title: 'About', path: '/about', icon: informationCircle },
          { title: 'Logout', path: '/logout', icon: informationCircle }
        ]
      }
    ],
  disconnectedPages: [
    {
      titleList: 'Navigate',
      links: [
        { title: 'Home', path: '/', icon: list },
        { title: 'Sign in', path: '/signin', icon: contacts },
        { title: 'Sign up', path: '/signup', icon: map },
        { title: 'About', path: '/about', icon: informationCircle }
      ]
    }
  ]
};


const Menu = ({ isLoggedIn }) => {
  const client = useApolloClient();
  const routeMenu = (isLoggedIn) ? routes.connectedPages : routes.disconnectedPages;

  const handleLogOut = () => {
    client.writeData({ data: { isLoggedIn: false } });
    client.writeData({ data: { username: undefined } });
  }

  const renderMenuListItems = routeMenu.map(page => (
    <IonList key={page.titleList}>
      <IonListHeader>{page.titleList}</IonListHeader>
      {page.links.map(p => {
        return (
          <IonMenuToggle key={p.title} auto-hide="false">
            <IonItem button routerLink={p.path} routerDirection="none">
              <IonIcon slot="start" icon={p.icon} />
              <IonLabel>{p.title}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )
      })}
    </IonList>
  ));

  return (
    <IonMenu type="push" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        {renderMenuListItems}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
