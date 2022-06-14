import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListaEvenimenteScreen from './ListaEvenimenteScreen';
import AddEvenimentScreen from './AddEvenimentScreen';
import DetaliiEvenimentScreen from './DetaliiEvenimentScreen';
import CameraScreen from './CameraScreen';

type ListaEStackParamList = {
  AddEvenimentScreen: undefined;
  ListaEvenimenteScreen: undefined;
  DetaliiEvenimentScreen: undefined;
  CameraScreen: undefined;
};
const Stack = createStackNavigator<ListaEStackParamList>();

const ListaNavigatorScreen: FC<any> = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaEvenimenteScreen"
        component={ListaEvenimenteScreen}
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
    </Stack.Navigator>
  );
};

export default ListaNavigatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
