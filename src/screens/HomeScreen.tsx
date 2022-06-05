import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import ListaEScreen from './ListaEScreen';
import CalendarEScreen from './CalendarEScreen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

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
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string = 'forklift';
          let size;
          if (route.name === 'ListaEScreen') {
            iconName = 'list-ul';
            size = focused ? 25 : 15;
            color = focused ? '#f0edf6' : '#0f0e0f';
          } else if (route.name === 'CalendarEScreen') {
            iconName = 'calendar-alt';
            size = focused ? 25 : 15;
            color = focused ? '#f0edf6' : '#0f0e0f';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      activeColor="#f0edf6"
      inactiveColor="#0f0e0f"
      barStyle={{backgroundColor: '#4D4A95'}}>
      <Tab.Screen
        name="ListaEScreen"
        component={ListaEScreen}
        initialParams={{navigation: navigation}}
      />
      <Tab.Screen name="CalendarEScreen" component={CalendarEScreen} />
    </Tab.Navigator>

    // <View style={styles.container}>
    //   <Text style={styles.text}>Email: {auth().currentUser?.email}</Text>
    //   <TouchableOpacity onPress={handleSignOut} style={styles.button}>
    //     <Text style={styles.buttonText}>Sign out</Text>
    //   </TouchableOpacity>
    // </View>
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
