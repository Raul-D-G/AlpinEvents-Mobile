import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import auth from '@react-native-firebase/auth';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../redux';
import {useDispatch} from 'react-redux';

const ListaEScreen: FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const {onLogin, setEmail, setPassword} = bindActionCreators(
    actionCreators,
    dispatch,
  );
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        onLogin('', '', '');
        setEmail('');
        setPassword('');
        navigation.replace('LoginScreen');
      })
      .catch((error: {message: any}) => console.log(error.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {auth().currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListaEScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
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
});
