import React, {useEffect, FC, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import SocialButton from '../components/SocialButton';
import {GoogleSignin} from '@react-native-community/google-signin';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {actionCreators, ApplicationState} from '../redux';
import {bindActionCreators} from 'redux';
import {COLORS} from '../utils/AppConst';

const LoginScreen: FC<any> = ({navigation}) => {
  const {email, password} = useSelector(
    (state: ApplicationState) => state.userReducer,
  );

  const dispatch = useDispatch();

  const {getEvents, setEmail, setPassword, onLogin} = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [isValid, setIsValid] = useState(false);

  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    setIsValid(true);

    if (email === '') {
      handleError('Email incorect', 'email');
      setEmail('');
      setIsValid(false);
      valid = false;
    }
    if (password === '') {
      handleError('Parolă incorectă', 'password');
      setPassword('');
      setIsValid(false);
      valid = false;
    }

    return valid;
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user: any) => {
      if (user) {
        const idToken = await user.getIdToken(true);
        onLogin(user.email, user.displayName, user.uid, idToken);
        getEvents(user.uid, idToken);
        navigation.replace('MainNavigator');
      }
    });

    GoogleSignin.configure({
      webClientId:
        '998781478960-tie73rdv8skbs98vu4smpu0bgdn5nfj2.apps.googleusercontent.com',
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    validate();
    if (!email) {
      Alert.alert(
        'Atenție!',
        'Trebuie să introduceți o adresă de email validă!',
        [
          {
            text: 'Ok',
            onPress: () => {
              setEmail('');
              setPassword('');
            },
          },
        ],
      );
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials: {user: any}) => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })
        .catch((error: {message: any}) => console.log(error));
    }
  };

  const handleLogin = () => {
    validate();
    if (!email) {
      Alert.alert(
        'Atenție!',
        'Trebuie să introduceți o adresă de email validă!',
        [
          {
            text: 'Ok',
            onPress: () => {
              setEmail('');
              setPassword('');
            },
          },
        ],
      );
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials: {user: any}) => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch((error: {message: string}) => {
          const message = error.message.slice(
            1,
            error.message.lastIndexOf(']'),
          );

          if (message === 'auth/invalid-email') {
            Alert.alert('Atentie!', 'Indroduceti o adresa de email valida!', [
              {
                text: 'Ok',
                onPress: () => {
                  setEmail('');
                  setPassword('');
                },
              },
            ]);
          }
          Alert.alert(
            'Atenție!',
            error.message.slice(error.message.lastIndexOf(']') + 1),
            [
              {
                text: 'Ok',
                onPress: () => {
                  setEmail('');
                  setPassword('');
                },
              },
            ],
          );
        });
    }
  };

  const googleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'black'}
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            onFocus={() => handleError(null, 'email')}
          />
          {errors.email ? (
            <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
              {errors.email}
            </Text>
          ) : null}
          <TextInput
            placeholder="Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            onFocus={() => handleError(null, 'password')}
          />
          {errors.password ? (
            <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
              {errors.password}
            </Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    paddingTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: 'black',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
