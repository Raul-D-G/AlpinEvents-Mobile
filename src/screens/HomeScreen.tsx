import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';

const HomeScreen: FC<any> = ({navigation}) => {
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
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

export default HomeScreen;

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
