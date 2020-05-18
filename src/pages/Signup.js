import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './../css/Signup.scss';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGNUP } from '../utils/UserApi';
import { ARUQUIZ_USER_IS_LOGGED_IN, ARUQUIZ_USER_USERNAME, ARUQUIZ_USER_TOKEN } from '../utils/Constants';
import aruquizLogo from './../assets/img/aruquiz_home.png';
import Loading from '../components/Utils/Loading';



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
      window.location = '/quizzes';
    }
  }, [dataForSignup]);

  if (loading) return <Loading/>

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
          <img src={aruquizLogo} alt="Aruquiz logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">Nom d'utilisateur</IonLabel>
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
              <IonLabel position="floating" color="primary">Mot de passe</IonLabel>
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
              <IonButton type="submit" expand="block" className={'btn-signin'}>Créer</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className={'text-center'}>
            <button type="button" class="google-button">
              <span className="google-button__icon">
                <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
              </span>
              <span className="google-button__text">Se connecter avec Google</span>
            </button>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Signup;