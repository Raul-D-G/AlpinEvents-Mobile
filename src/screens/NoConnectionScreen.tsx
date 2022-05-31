import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import img from '../../assets/no_connections.png';

const NoConnectionScreen: FC<any> = ({checkConnected}) => {
  return (
    <View style={styles.container}>
      <Image
        source={img}
        style={{width: '30%', height: '30%'}}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={checkConnected} style={styles.button}>
          <Text style={styles.buttonText}>Reîncărcați</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
export default NoConnectionScreen;
