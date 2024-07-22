import * as React from 'react';
import { HS_HomeStackParam } from '../../Types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/users/home_serviceScreens/homeScreens/Home';

const HS_Home_Stack = createNativeStackNavigator<HS_HomeStackParam>();
const HS_HomeStack: React.FC = () => (
  <HS_Home_Stack.Navigator
    initialRouteName="HS_Home"
    screenOptions={{
      headerShown: false,
    }}
    >
    <HS_Home_Stack.Screen name="HS_Home" component={Home} />
  </HS_Home_Stack.Navigator>
);

export default HS_HomeStack;
