import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import LoginScreen from './screens/LoginScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

type RootStackParamList = {
  LoginScreen: undefined;
  MainNavigator: undefined;
};

import SplashScreen from 'react-native-splash-screen';
import {checkConnected} from './utils/Functions';
import NoConnectionScreen from './screens/NoConnectionScreen';

const Stack = createStackNavigator<RootStackParamList>();
import NetInfo from '@react-native-community/netinfo';
import {Provider} from 'react-redux';
import {store} from './redux';

import {LogBox} from 'react-native';
import MainNavigator from './screens/navigatoare/MainNavigator';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'Non-serializable values were found in the navigation state',
  'Warning: Failed prop type: Invalid prop `value` of type `string` supplied to `NumericInput`, expected `number`',
]);

const App = () => {
  const [connectStatus, setConnectStatus] = useState(false);

  const checkIfConnected = async () => {
    const res = await checkConnected();

    if (res.isConnected) {
      setConnectStatus(res.isConnected);
    } else {
      setConnectStatus(false);
      Alert.alert('Eroare!', 'Nu aveti acces la internet', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnectStatus(state.isConnected);
      } else {
        setConnectStatus(false);
      }
    });

    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  return connectStatus ? (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{
              header: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <NoConnectionScreen checkConnected={checkIfConnected} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
