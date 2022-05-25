import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Saluta Cristian!!</Text>
      <Icon name="remove" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default Header;
