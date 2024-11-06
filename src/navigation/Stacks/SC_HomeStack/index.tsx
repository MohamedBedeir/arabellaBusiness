import * as React from 'react';
import { SC_HomeStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/sports_clubScreens/homeScreens/Home';

const SC_Home_Stack = createNativeStackNavigator<SC_HomeStackParam>();
const SC_HomeStack: React.FC = () => (
  <SC_Home_Stack.Navigator
    initialRouteName="SC_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <SC_Home_Stack.Screen name="SC_Home" component={Home} />
  </SC_Home_Stack.Navigator>
);

export default SC_HomeStack;
