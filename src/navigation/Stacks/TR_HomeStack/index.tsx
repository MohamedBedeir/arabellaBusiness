import * as React from 'react';
import { TR_HomeStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/trainingScreens/homeScreens/Home';

const TR_Home_Stack = createNativeStackNavigator<TR_HomeStackParam>();
const TR_HomeStack: React.FC = () => (
  <TR_Home_Stack.Navigator
    initialRouteName="TR_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <TR_Home_Stack.Screen name="TR_Home" component={Home} />
  </TR_Home_Stack.Navigator>
);

export default TR_HomeStack;
