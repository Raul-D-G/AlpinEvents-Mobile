import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../redux';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import BG_IMG from '../../assets/logoApp-removebg-preview.png';

const LogOutScreen: FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const {setEmail, setPassword, onLogin, setEvents, setMarker} =
    bindActionCreators(actionCreators, dispatch);

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        onLogin('', '', '', '');
        setEmail('');
        setPassword('');
        setEvents([]);
        setMarker({});
        navigation.replace('LoginScreen');
      })
      .catch((error: {message: any}) => console.log(error.message));
  };
  return (
    <View style={styles.container}>
      <Image source={BG_IMG} style={styles.logo}></Image>

      <Text style={styles.text}>Email: {auth().currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Deconectare</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9C89FF',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    color: 'black',
  },
  logo: {
    position: 'absolute',
    top: 400,
    left: 150,
  },
});
