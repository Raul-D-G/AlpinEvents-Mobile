import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import ListaNavigatorScreen from './navigatoare/ListaNavigatorScreen';
import CalendarNavigatorScreen from './navigatoare/CalendarNavigatorScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen: FC<any> = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string = 'list-ul';
          let size;
          if (route.name === 'Listă Evenimente') {
            iconName = 'list-ul';
            size = focused ? 25 : 15;
            color = focused ? '#f0edf6' : '#0f0e0f';
          } else if (route.name === 'Calendar') {
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
        name="Listă Evenimente"
        component={ListaNavigatorScreen}
        initialParams={{navigation: navigation}}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarNavigatorScreen}
        initialParams={{navigation: navigation}}
      />
    </Tab.Navigator>
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
