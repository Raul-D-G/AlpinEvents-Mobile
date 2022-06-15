import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarEScreen from '../CalendarEScreen';
import DetaliiEvenimentScreen from '../DetaliiEvenimentScreen';
import CameraScreen from '../CameraScreen';
import AddEvenimentScreen from '../AddEvenimentScreen';
import VerificareDataScreen from '../VerificareDataScreen';

type CalendarStackParamList = {
  CalendarEScreen: undefined;
  DetaliiEvenimentScreen: undefined;
  CameraScreen: undefined;
  AddEvenimentScreen: undefined;
  VerificareDataScreen: undefined;
};

const Stack = createStackNavigator<CalendarStackParamList>();

export default function CalendarNavigatorScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarEScreen"
        component={CalendarEScreen}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="DetaliiEvenimentScreen"
        component={DetaliiEvenimentScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AddEvenimentScreen"
        component={AddEvenimentScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="VerificareDataScreen"
        component={VerificareDataScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
