import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../MainScreen';
import LogOutScreen from '../LogOutScreen';

type CalendarStackParamList = {
  MainScreen: undefined;
  LogOutScreen: undefined;
};

const Stack = createStackNavigator<CalendarStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="LogOutScreen"
        component={LogOutScreen}
        options={{title: 'Deconectare!'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
