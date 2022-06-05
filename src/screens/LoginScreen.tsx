import React, {useEffect, FC} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import SocialButton from '../components/SocialButton';
import {GoogleSignin} from '@react-native-community/google-signin';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {actionCreators, ApplicationState} from '../redux';
import {bindActionCreators} from 'redux';

const LoginScreen: FC<any> = ({navigation}) => {
  const {email, password, user} = useSelector(
    (state: ApplicationState) => state.userReducer,
  );

  const dispatch = useDispatch();

  const {setEmail, setPassword, onLogin} = bindActionCreators(
    actionCreators,
    dispatch,
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      if (user) {
        onLogin(user.email, user.displayName, user.uid);
        navigation.replace('MainScreen');
      }
    });

    GoogleSignin.configure({
      webClientId:
        '998781478960-tie73rdv8skbs98vu4smpu0bgdn5nfj2.apps.googleusercontent.com',
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (!email) {
      Alert.alert(
        'Atentie!',
        'Trebuie sa introduceti o adresa de email valida',
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
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials: {user: any}) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error: {message: any}) => console.log(error));
  };

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Atentie!', 'Trebuie sa introduceti o adresa de email', [
        {
          text: 'Ok',
          onPress: () => {
            setEmail('');
            setPassword('');
          },
        },
      ]);
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
            'Atentie!',
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
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
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
