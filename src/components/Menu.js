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
  IonAvatar
} from '@ionic/react';
import { list, contacts, create, stats, logIn, logOut, wifi, personAdd, download } from 'ionicons/icons';
import React from 'react';
import { useApolloClient } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';

const routes = {
  connectedPages:
    [
      {
        titleList: '',
        links: [
          { title: 'Quiz', path: '/quizzes', icon: list },
          { title: 'Mes classes', path: '/schoolClasses', icon: contacts },
          { title: 'Créer un quiz', path: '/new', icon: create },
          { title: 'Rapport', path: '/report', icon: stats },
          { title: 'Live', path: '/live-quiz', icon: wifi },
          { title: 'Se déconnecter', path: '/logout', icon: logOut }
        ]
      }
    ],
  disconnectedPages: [
    {
      titleList: 'Navigate',
      links: [
        { title: 'Accueil', path: '/', icon: list },
        { title: 'Se connecter', path: '/signin', icon: logIn },
        { title: 'S\'inscrire', path: '/signup', icon: personAdd },
      ]
    }
  ]
};


const Menu = ({ isLoggedIn, userName }) => {
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
            <IonItem button routerLink={p.path} routerDirection="none" className="menu-item">
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
      <IonContent className="outer-content">
        {isLoggedIn &&
          <div className="avatar">
            <img src={`https://eu.ui-avatars.com/api/?name=${userName[0]}&background=D46EFF&color=fff`} />
            <p>{userName}</p>
          </div>
        }
        {renderMenuListItems}
        <IonItem button className="menu-item">
          <IonIcon slot="start" icon={download} />
          <IonLabel><Link className={'link'} to="/markers_aruquiz.zip" target="_blank" download>Téléchager les formes</Link> </IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
