import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './../css/Signin.scss';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGNIN } from '../utils/UserApi';
import { ARUQUIZ_USER_IS_LOGGED_IN, ARUQUIZ_USER_USERNAME, ARUQUIZ_USER_TOKEN } from './../utils/Constants';



const Signin = ({ setIsLoggedIn, history, setName: setNameAction }) => {
  const client = useApolloClient();

  const [signin, { loading, error, data: dataForSignin }] = useMutation(SIGNIN);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (dataForSignin && dataForSignin.login && dataForSignin.login.token) {
      client.writeData({
        data: {
          isLoggedIn: true,
          userName: dataForSignin.login.user.userName,
          token: dataForSignin.login.token
        }
      });
      localStorage.setItem(ARUQUIZ_USER_IS_LOGGED_IN, true);
      localStorage.setItem(ARUQUIZ_USER_USERNAME, dataForSignin.login.user.userName);
      localStorage.setItem(ARUQUIZ_USER_TOKEN, dataForSignin.login.token);
      window.location = '/';
    }
  }, [dataForSignin]);

  const login = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      signin({ variables: { email, password } });
    }
  };

  return (
    <IonPage id="signin-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Sign in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setEmail(e.detail.value);
                setEmailError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                email is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="floating" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Signin;