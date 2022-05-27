import React, {useEffect, useState, FC} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import SocialButton from '../components/SocialButton';
import {GoogleSignin} from '@react-native-community/google-signin';

const LoginScreen: FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      if (user) {
        navigation.navigate('HomeScreen');
      }
    });

    GoogleSignin.configure({
      webClientId:
        '998781478960-tie73rdv8skbs98vu4smpu0bgdn5nfj2.apps.googleusercontent.com',
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    console.log(email);
    console.log(password);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials: {user: any}) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error: {message: any}) => console.log(error));
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials: {user: any}) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch((error: {message: any}) => console.log(error.message));
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
