import * as React from 'react';
import {MA_HomeStackParam} from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/makeup_artistScreens/homeScreens/Home';

const MA_Home_Stack = createNativeStackNavigator<MA_HomeStackParam>();
const MA_HomeStack: React.FC = () => (
  <MA_Home_Stack.Navigator
    initialRouteName="MA_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <MA_Home_Stack.Screen name="MA_Home" component={Home} />
  </MA_Home_Stack.Navigator>
);

export default MA_HomeStack;
