import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './../css/Signup.scss';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGNUP } from '../utils/UserApi';
import { ARUQUIZ_USER_IS_LOGGED_IN, ARUQUIZ_USER_USERNAME, ARUQUIZ_USER_TOKEN } from '../utils/Constants';



const Signup = () => {
  const client = useApolloClient();

  const [signup, { loading, error, data: dataForSignup }] = useMutation(SIGNUP);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (dataForSignup && dataForSignup.signup && dataForSignup.signup.token) {
      client.writeData({
        data: {
          isLoggedIn: true,
          userName,
          token: dataForSignup.signup.token
        }
      });
      localStorage.setItem(ARUQUIZ_USER_IS_LOGGED_IN, true);
      localStorage.setItem(ARUQUIZ_USER_USERNAME, dataForSignup.signup.user.userName);
      localStorage.setItem(ARUQUIZ_USER_TOKEN, dataForSignup.signup.token);
      window.location = '/';
    }
  }, [dataForSignup]);

  const login = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!userName) {
      setUserNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (userName && password) {
      signup({ variables: { email, userName, password } });
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">userName</IonLabel>
              <IonInput name="userName" type="text" value={userName} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUserName(e.detail.value);
                setUserNameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && userNameError && <IonText color="danger">
              <p className="ion-padding-start">
                userName is required
              </p>
            </IonText>}

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
              <IonButton type="submit" expand="block">Create</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Signup;