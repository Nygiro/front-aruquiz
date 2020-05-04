import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { IonApp } from '@ionic/react';

/**
 * COMPONENT
 */
import Home from './pages/Home';
/**
 * STORE
 */
import {GET_IS_DARK_MODE } from './utils/Store';

const App = () => {
  const { data: dataForIsDarkMode } = useQuery(GET_IS_DARK_MODE);
  return (
      <IonApp className={'aruquiz-theme'}>
        <Home/>
      </IonApp>
  )
}

export default App;

